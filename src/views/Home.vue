<script setup lang="ts">
import { computed, onBeforeUpdate, onMounted, onUpdated, reactive, ref, watch } from 'vue';
import { getUsers } from '../api/users';
import { User } from '../interfaces';

function greet(name: string): string {
  return `Hola ${name}!`
}

// función anónima (sin nombre)
(name: string): string => `Hola ${name}!`

let message = ref('Hola mundo')
let showGreeting = ref(false)
let greetingButtonMessage = computed(() => {
  return showGreeting.value ? 'Ocultar saludo' : 'Mostrar saludo'
})
let items = ["manzanas", "peras", "naranjas", "plátanos"]
const url = 'https://google.com'

function changeGreeting() {
  showGreeting.value = !showGreeting.value
}

watch(showGreeting, (newValue, oldValue) => {
  console.log(`showGreeting cambió de ${oldValue} a ${newValue}`)
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate')
})

onUpdated(() => {
  console.log('onUpdated')
})

const users = ref<User[]>([])
async function fetchUsers() {
  users.value = await getUsers()
}

// fetchUsers()
</script>


<template>
  <button @click="fetchUsers">Cargar Usuarios</button>

  <p id="">{{ message.length }}</p>
  <p v-if="showGreeting">{{ greet('Diego') }}</p>
  <p id="myid" v-else>{{ "Hola mundo" }}</p>

  <ul>
    <li class="myitemlist" v-for="item in items">{{ item }}</li>
  </ul>

  <a :href="url">Link</a><br>

  <button @click="changeGreeting"> {{ greetingButtonMessage }} </button>
  <br>

  <input type="text" v-model="message">
  <button @click="message = ''">limpiar</button>
  {{ users }}
</template>
  
<style scoped>
.myitemlist {
  color: red;
}

#myid {

  color: blue;
  font-size: x-large;
}
</style>
  