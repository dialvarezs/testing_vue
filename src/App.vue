<script setup lang="ts"></script>

<template>
  <div>
    <router-link :to="{ name: 'Home' }">[Home]</router-link>
    <router-link :to="{ name: 'Items' }">[Items]</router-link>
    <router-link :to="{ name: 'Login' }">[Login]</router-link>
    <router-link :to="{ name: 'Me' }">[Me]</router-link>
  </div>

  <router-view></router-view>
</template>

<style scoped></style>
