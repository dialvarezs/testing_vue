import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ListUsers from '@/views/ListUsers.vue'
import NewUser from '@/views/NewUser.vue'

const routes: RouteRecordRaw[] = [
  { path: '', component: Home, name: 'Home' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/users', component: ListUsers, name: 'ListUsers' },
  { path: '/users/new', component: NewUser, name: 'NewUser' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
