<script setup lang="ts">
import { ref } from 'vue'
import { login } from '../api/auth'
import { useTokenStore } from '../stores/token'
import { useRouter } from 'vue-router'
import { getUserMe } from '../api/users';

const tokenStore = useTokenStore()
const username = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()

async function sendLogin() {
  try {
    errorMessage.value = ''
    const token = await login(username.value, password.value)
    tokenStore.setToken(token.accessToken, token.tokenType)

    const user = await getUserMe()
    tokenStore.setUser(user.fullname)

    router.push({name: 'Home'})
  } catch (error: any) {
    errorMessage.value = `ERROR: ${error.message}`
  }
}
</script>

<template>
  <v-container fluid class="bg-gray">
    <v-row>
      <v-col cols="3" class="mx-auto">
        <v-card class="px-6 py-8">
          <v-form>
            <v-text-field label="Usuario" v-model="username">
            </v-text-field>
            <v-text-field type="password" label="Contraseña" v-model="password">
            </v-text-field>
          </v-form>
          <div v-if="errorMessage">
            <v-alert type="error" class="mt-4">
              {{ errorMessage }}
            </v-alert>
          </div>
          <v-card-actions>
            <v-btn variant="flat" color="green" @click="sendLogin">Ingresar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.error-message {
  color: red;
}

.success-message {
  color: green;
}
</style>