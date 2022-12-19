<script setup lang="ts">
  import { Ref, reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'

  import PageHeader from '@/components/PageHeader.vue'
  import UserForm from '@/components/UserForm.vue'

  import { postUser } from '@/api/users'
  import { UserEdit } from '@/interfaces'

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
