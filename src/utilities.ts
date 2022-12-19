import { BASE_URL } from '@/api'
import { Group } from '@/interfaces'
import router from '@/router'
import { useTokenStore } from '@/stores/token'

function checkRoutePermission(
  routeName: string,
  routeParams: Record<string, string | never> = {}
): boolean {
  const tokenStore = useTokenStore()
  const user = tokenStore.user
  const route = router.resolve({ name: routeName, params: routeParams })

  if (user !== null && user.groups) {
    if (route.meta.allowedGroups) {
      return user.groups.some((group: Group) =>
        (route.meta.allowedGroups as string[]).includes(group.name)
      )
    }
    return true
  }

  return false
}

function getImageUrl(image: string): string {
  return `${BASE_URL}${image}`
}

export { checkRoutePermission, getImageUrl }
