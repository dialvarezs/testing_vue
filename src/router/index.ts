import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useTokenStore } from '@/stores/token'
import mainRoutes from '@/router/main'

const routes: RouteRecordRaw[] = [
  ...mainRoutes,
  { path: '/:catchAll(.*)', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useTokenStore()

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login' })
    }
  }
  next()
})

export default router
