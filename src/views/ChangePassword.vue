<script setup lang="ts">
  import { Ref, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import PageHeader from '@/components/PageHeader.vue'
  import PasswordInput from '@/components/PasswordInput.vue'

  import { changePassword } from '@/api/users'

  const route = useRoute()
  const router = useRouter()

  const pageTitle =
    route.name === 'ChangePasswordMe'
      ? 'Cambiar mi contraseña'
      : 'Cambiar contraseña de usuario'

  const oldPassword: Ref<string> = ref('')
  const newPassword: Ref<string> = ref('')
  const newPasswordConfirm: Ref<string> = ref('')

  const form: Ref<any> = ref(null)
  const saving: Ref<boolean> = ref(false)
  const valid: Ref<boolean> = ref(false)
  const errorMessage: Ref<string> = ref('')
  const rules = {
    oldPassword: [(v: string) => !!v || 'La contraseña antigua es requerida'],
    newPassword: [(v: string) => !!v || 'La contraseña nueva es requerida'],
    newPasswordConfirm: [
      (v: string) =>
        !!v || 'La confirmación de la contraseña nueva es requerida',
      (v: string) => v === newPassword.value || 'Las contraseñas no coinciden',
    ],
  }

  async function submit() {
    const { valid } = await form.value.validate()

    if (valid) {
      try {
        const userId =
          route.name === 'ChangePasswordMe'
            ? null
            : parseInt(route.params.id as string)

        saving.value = true
        await changePassword(oldPassword.value, newPassword.value, userId)

        const nextRoute =
          userId !== null ? { name: 'ListUsers' } : { name: 'Home' }
        router.push(nextRoute)
      } catch (error: any) {
        if (error.message) {
          errorMessage.value = error.message
        } else {
          errorMessage.value = 'Error updating user'
        }
        console.error(error)
      } finally {
        saving.value = false
      }
    }
  }
</script>

<template>
  <v-container>
    <PageHeader :title="pageTitle" />
    <v-row justify="center" class="mt-6">
      <v-col cols="6">
        <v-form ref="form" v-model="valid" lazy-validation>
          <PasswordInput
            v-model="oldPassword"
            label="Contraseña antigua"
            :rules="rules.oldPassword"
          />
          <PasswordInput
            v-model="newPassword"
            label="Contraseña nueva"
            :rules="rules.newPassword"
          />
          <PasswordInput
            v-model="newPasswordConfirm"
            label="Contraseña nueva (confirmación)"
            :rules="rules.newPasswordConfirm"
          />

          <v-alert
            v-if="errorMessage != ''"
            type="error"
            variant="tonal"
            class="mb-4"
          >
            {{ errorMessage }}
          </v-alert>

          <v-btn color="teal" class="mr-4" :loading="saving" @click="submit">
            Guardar
          </v-btn>

          <v-btn color="grey" class="mr-4" :to="{ name: 'Home' }">
            Cancelar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
