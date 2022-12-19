<script setup lang="ts">
  import { Ref, ref } from 'vue'

  interface Props {
    modelValue: string | undefined
    label: string
    rules?: any[] | undefined
  }
  const props = defineProps<Props>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void
  }>()

  const showPassword: Ref<boolean> = ref(false)

  const updateValue = (event: any) => {
    emit('update:modelValue', event.target.value)
  }
</script>

<template>
  <v-text-field
    :value="modelValue"
    :label="label"
    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :type="showPassword ? 'text' : 'password'"
    :rules="rules"
    @click:append-inner="showPassword = !showPassword"
    @input="updateValue"
  ></v-text-field>
</template>
