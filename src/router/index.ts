import {
  RouteLocationNormalized,
  RouteRecordRaw,
  createRouter,
  createWebHistory,
} from 'vue-router'

import mainRoutes from '@/router/main'
import { useTokenStore } from '@/stores/token'
import { checkRoutePermission } from '@/utilities'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
    allowedGroups?: string[]
  }
}

const routes: RouteRecordRaw[] = [
  ...mainRoutes,
  { path: '/:catchAll(.*)', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const { isAuthenticated } = useTokenStore()

    if (to.meta.requiresAuth) {
      if (!isAuthenticated) {
        return { name: 'Login', query: { redirect: to.fullPath } }
      }
      if (!checkRoutePermission(to.name as string, to.params as {})) {
        return { name: 'Home' }
      }
    }
  }
)

export default router
