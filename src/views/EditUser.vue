<script setup lang="ts">
  import { Ref, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import PageHeader from '@/components/PageHeader.vue'
  import UserForm from '@/components/UserForm.vue'

  import { getUser, patchUser, setUserImage } from '@/api/users'
  import { User, UserEdit } from '@/interfaces'
  import { getImageUrl } from '@/utilities'

  const router = useRouter()
  const route = useRoute()

  const userId = parseInt(route.params.id as string)
  const userData: Ref<User> = ref({} as User)
  const userFormatted: Ref<UserEdit> = ref({} as UserEdit)
  const saving: Ref<boolean> = ref(false)
  const errorMessage: Ref<string> = ref('')

  async function getUserData() {
    if (userId) {
      userData.value = await getUser(userId)
      userFormatted.value = formatUser(userData)
    }
  }

  function formatUser(userData: Ref<User>): UserEdit {
    return {
      username: userData.value.username,
      fullname: userData.value.fullname,
      age: userData.value.age,
      isActive: userData.value.isActive,
      groupIds: userData.value.groups.map((x) => x.id),
    }
  }

  async function submitEditedUser(userData: UserEdit) {
    saving.value = true
    errorMessage.value = ''

    console.info('submitEditedUser', userData)
    try {
      const updatedUser = await patchUser(userId, userData)
      console.info('Updated user', updatedUser)

      if (userData.image !== undefined && userData.image.length > 0) {
        await setUserImage(userId, userData.image[0])
      }

      router.push({ name: 'ListUsers' })
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

  getUserData()
</script>

<template>
  <v-container>
    <PageHeader :title="`Editar Usuario <${userData.username}>`" />
    <v-row v-if="userData.imagePath" justify="center" class="mt-6">
      <v-col cols="2">
        <v-img :src="getImageUrl(userData.imagePath)" />
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-6">
      <v-col cols="6">
        <UserForm
          :user-id="userId"
          :user-data="userFormatted"
          :error-message="errorMessage"
          :saving="saving"
          @submit="submitEditedUser"
          @cancel="router.push({ name: 'ListUsers' })"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
