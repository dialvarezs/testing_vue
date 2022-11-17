import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Items from '../views/Items.vue'
import Login from '../views/Login.vue'
import Me from '../views/Me.vue'
import NewUser from '../views/NewUser.vue'

const routes: RouteRecordRaw[] = [
  { path: '', component: Home, name: 'Home' },
  { path: '/items', component: Items, name: 'Items' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/me', component: Me, name: 'Me' },
  { path: '/new-user', component: NewUser, name: 'NewUser' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
