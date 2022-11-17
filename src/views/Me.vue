<script setup lang="ts">
  import { Ref, ref } from 'vue'
  import { getUserMe } from '../api/users'
  import { User } from '../interfaces'

  const user: Ref<User | null> = ref(null)
  const errorMessage = ref('')

  async function fetchMyUser() {
    try {
        errorMessage.value = ''
        user.value = await getUserMe()
    } catch (error: any) {
        errorMessage.value = `ERROR: ${error.message}`
    }
  }

  fetchMyUser()
</script>

<template>
  <div class="error-message">{{ errorMessage }}</div>
  {{ user }}
</template>

<style scoped>
.error-message {
  color: red;
}
</style>