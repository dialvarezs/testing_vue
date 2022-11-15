<script setup lang="ts">import { Ref, ref } from 'vue';
import { getUserMe } from '../api/users';
import { User } from '../interfaces';

const user: Ref<User | null> = ref(null)

async function fetchMyUser() {
    user.value = await getUserMe()
}

fetchMyUser()
</script>

<template>
    {{ user }}
</template>