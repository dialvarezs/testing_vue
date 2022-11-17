<script setup lang="ts">
  import { computed } from 'vue'

  export interface ItemProps {
    name: string
    color?: string
  }

  const props = withDefaults(defineProps<ItemProps>(), {
    color: '#39dadf',
  })

  const style = computed(() => {
    return {
      'background-color': props.color,
    }
  })
</script>

<template>
  <div class="item-block" :style="style">
    <h1>{{ name }}</h1>
    <slot></slot>
  </div>
</template>

<style scoped>
  .item-block {
    padding: 10px;
    margin: 5px;
    border-radius: 15px;
  }
</style>
