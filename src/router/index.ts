import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue';
import Items from '../views/Items.vue';

const routes: RouteRecordRaw[] = [
    { path: '', component: Home, name: 'Home' },
    { path: '/items', component: Items, name: 'Items' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router