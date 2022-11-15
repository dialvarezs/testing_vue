<script setup lang="ts">
</script>

<template>
  <div>
    <router-link :to="{ name: 'Home' }">[Home]</router-link>
    <router-link :to="{ name: 'Items' }">[Items]</router-link>
  </div>

  <router-view></router-view>
</template>

<style scoped>

</style>
