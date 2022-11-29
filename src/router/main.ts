import { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ListUsers from '@/views/ListUsers.vue'
import NewUser from '@/views/NewUser.vue'

const routes: RouteRecordRaw[] = [
  { path: '', component: Home, name: 'Home', meta: { requiresAuth: true } },
  { path: '/login', component: Login, name: 'Login' },
  {
    path: '/users',
    component: ListUsers,
    name: 'ListUsers',
    meta: { requiresAuth: true, allowedGroups: ['user_manager'] },
  },
  {
    path: '/users/new',
    component: NewUser,
    name: 'NewUser',
    meta: { requiresAuth: true, allowedGroups: ['user_manager'] },
  },
]

export default routes
