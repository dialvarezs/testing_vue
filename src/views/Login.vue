<script setup lang="ts">
  import { ref } from 'vue'
  import { login } from '../api/auth'
  import { useTokenStore } from '../stores/token'

  const tokenStore = useTokenStore()
  const username = ref('')
  const password = ref('')

  async function sendLogin() {
    const token = await login(username.value, password.value)
    tokenStore.setToken(token.accessToken, token.tokenType)
  }
</script>

<template>
  <div>
    <input v-model="username" />
    <input v-model="password" type="password" />
    <button @click="sendLogin">Login</button>
  </div>
</template>
