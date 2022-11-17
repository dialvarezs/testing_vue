<script setup lang="ts">import { Ref, ref } from 'vue';
import { postUser } from '../api/users';
import { NewUser } from '../interfaces';

const newUserData: Ref<NewUser> = ref({
  username: '',
  fullname: '',
  password: '',
  age: null,
  // groupIds: [],
});

async function sendNewUser() {
  try {
    const createdUser = await postUser(newUserData.value);
    console.log(createdUser);
  } catch (error: any) {
    console.error(error);
  }
}
</script>

<template>
<div>
  <input v-model="newUserData.username" />
  <input v-model="newUserData.fullname" />
  <input v-model="newUserData.password" type="password" />
  <input v-model="newUserData.age" type="number" />
  <button @click="sendNewUser">Create user</button>
</div>
</template>