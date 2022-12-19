<script setup lang="ts">
  import { Ref, computed, ref, watch, watchEffect } from 'vue'

  import PasswordInput from '@/components/PasswordInput.vue'

  import { getGroups, getUsers } from '@/api/users'
  import { Group, User, UserEdit } from '@/interfaces'

  interface Props {
    userData: UserEdit
    userId?: number
    isNew?: boolean
    errorMessage?: string
    saving?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    isNew: false,
    errorMessage: '',
    saving: false,
  })

  const emit = defineEmits<{
    (event: 'update-data', userData: UserEdit): void
    (event: 'submit', userData: UserEdit): void
    (event: 'cancel'): void
  }>()

  watchEffect(() => {
    emit('update-data', props.userData)
  })

  const existingUsers: Ref<User[]> = ref([])
  const groups: Ref<Group[]> = ref([])
  const updateImage: Ref<boolean> = ref(false)

  // clean up image data when the user cancels the image update
  watch(updateImage, (newValue) => {
    if (newValue === false) {
      props.userData.image = undefined
    }
  })

  const availableUsername = computed(() => {
    return !existingUsers.value
      .map((x) => x.username)
      .includes(props.userData.username)
  })
  const form: Ref<any> = ref(null)
  const valid: Ref<boolean> = ref(false)
  const rules = {
    user: [
      (v: string) => !!v || 'El usuario es requerido',
      () =>
        availableUsername.value || 'El nombre de usuario no está disponible',
    ],
    fullname: [(v: string) => !!v || 'El nombre es requerido'],
    password: [(v: string) => !!v || 'La contraseña es requerida'],
  }

  async function fetchUsers() {
    const users = await getUsers()
    // filter out the current user if editing
    existingUsers.value = users.filter((x) => x.id !== props.userId)
  }

  async function fetchGroups() {
    groups.value = await getGroups()
  }

  async function submitForm() {
    const { valid } = await form.value.validate()

    if (valid) {
      emit('submit', props.userData)
    }
  }

  fetchUsers()
  fetchGroups()
</script>

<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="userData.username"
      label="Usuario"
      :rules="rules.user"
    ></v-text-field>
    <v-text-field
      v-model="userData.fullname"
      label="Nombre"
      :rules="rules.fullname"
    ></v-text-field>
    <PasswordInput
      v-if="isNew"
      v-model="userData.password"
      label="Contraseña"
      :rules="rules.password"
    />
    <v-text-field
      v-model="userData.age"
      label="Edad"
      type="number"
    ></v-text-field>
    <v-select
      v-model="userData.groupIds"
      :items="groups"
      item-title="name"
      item-value="id"
      multiple
      chips
      label="Grupos"
    >
    </v-select>
    <v-checkbox
      v-if="!isNew"
      v-model="userData.isActive"
      label="Activo"
    ></v-checkbox>
    <v-checkbox
      v-if="!isNew"
      v-model="updateImage"
      label="Modificar Imagen"
    ></v-checkbox>
    <v-file-input
      v-if="isNew || updateImage"
      v-model="userData.image"
      accept="image/png, image/jpeg, image/bmp"
      label="Imagen de Perfil"
      clearable
      show-size
    ></v-file-input>

    <v-alert
      v-if="errorMessage != ''"
      type="error"
      variant="tonal"
      class="mb-4"
    >
      {{ errorMessage }}
    </v-alert>

    <v-btn color="teal" class="mr-4" :loading="saving" @click="submitForm">
      Guardar
    </v-btn>

    <v-btn color="grey" class="mr-4" @click="emit('cancel')"> Cancelar </v-btn>
  </v-form>
</template>
