<script setup lang="ts">
import { useTokenStore } from './stores/token'

const tokenStore = useTokenStore()
</script>

<template>
  <v-app>
    <v-app-bar app v-if="tokenStore.isAuthenticated">
      <v-toolbar-title>Application</v-toolbar-title>
      <v-btn>A</v-btn>
      <span class="mx-3">Hola, {{ tokenStore.user }}</span>
    </v-app-bar>

    <v-spacer></v-spacer>
    <v-main class="bg-grey-lighten-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style scoped>

</style>
