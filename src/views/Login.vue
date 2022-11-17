<script setup lang="ts">
import { ref } from 'vue'
import { login } from '../api/auth'
import { useTokenStore } from '../stores/token'

const tokenStore = useTokenStore()
const username = ref('')
const password = ref('')
const errorMessage = ref('')
const logged = ref(false)

async function sendLogin() {
  try {
    logged.value = false
    errorMessage.value = ''
    const token = await login(username.value, password.value)
    tokenStore.setToken(token.accessToken, token.tokenType)
    logged.value = true
  } catch (error: any) {
    errorMessage.value = `ERROR: ${error.message}`
  }
}
</script>

<template>
  <div>
    <input v-model="username" />
    <input v-model="password" type="password" />
    <button @click="sendLogin">Login</button>
  </div>
  <div v-if="errorMessage != ''" class="error-message">{{ errorMessage }}</div>
  <div v-else-if="logged" class="success-message">Successful login</div>
</template>

<style scoped>
.error-message {
  color: red;
}

.success-message {
  color: green;
}
</style>