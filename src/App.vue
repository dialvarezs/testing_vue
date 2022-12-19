<script setup lang="ts">
  import { useRouter } from 'vue-router'

  import { useTokenStore } from '@/stores/token'
  import { checkRoutePermission } from '@/utilities'

  const tokenStore = useTokenStore()
  const router = useRouter()

  async function logout() {
    tokenStore.clearData()
    await router.push({ name: 'Login' })
  }
</script>

<template>
  <v-app>
    <v-app-bar v-if="tokenStore.isAuthenticated" class="bg-teal-darken-1">
      <v-toolbar-title class="">
        <span>MyApp</span>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn :to="{ name: 'Home' }">Inicio</v-btn>
        <v-btn
          v-show="checkRoutePermission('ListUsers')"
          :to="{ name: 'ListUsers' }"
        >
          Usuarios
        </v-btn>
        <v-menu bottom offset-y close-on-click>
          <template #activator="{ props }">
            <v-btn prepend-icon="mdi-account" v-bind="props">
              {{ tokenStore.user?.fullname }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item link :to="{ name: 'ChangePasswordMe' }">
              <v-list-item-title> Cambiar Contraseña </v-list-item-title>
            </v-list-item>
            <v-list-item link @click="logout">
              <v-list-item-title> Cerrar Sesión </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>

    <v-main class="bg-grey-lighten-5">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style scoped></style>
