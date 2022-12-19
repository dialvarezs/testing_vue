<script setup lang="ts">
  import { reactive, ref, Ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { UserEdit } from '@/interfaces'
  import { postUser } from '@/api/users'
  import PageHeader from '@/components/PageHeader.vue'
  import UserForm from '@/components/UserForm.vue'

  const router = useRouter()

  const userData = reactive<UserEdit>({
    username: '',
    fullname: '',
    password: '',
    age: null,
    groupIds: [],
  })
  const saving: Ref<boolean> = ref(false)
  const errorMessage: Ref<string> = ref('')

  async function submitNewUser(userData: UserEdit) {
    saving.value = true
    errorMessage.value = ''
    try {
      const createdUser = await postUser(userData)
      console.info('Created user', createdUser)
      router.push({ name: 'ListUsers' })
    } catch (error: any) {
      if (error.message) {
        errorMessage.value = error.message
      } else {
        errorMessage.value = 'Error creating user'
      }
      console.error(error)
    } finally {
      saving.value = false
    }
  }
</script>

<template>
  <v-container>
    <PageHeader title="Nuevo Usuario" />
    <v-row justify="center" class="mt-6">
      <v-col cols="6">
        <UserForm
          :user-data="userData"
          is-new
          :error-message="errorMessage"
          :saving="saving"
          @submit="submitNewUser"
          @cancel="router.push({ name: 'ListUsers' })"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
