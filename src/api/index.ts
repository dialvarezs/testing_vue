import camelcaseKeys from 'camelcase-keys'

import router from '@/router'

import { useTokenStore } from '../stores/token'

const BASE_URL = 'http://localhost:8000'

async function apiFetch<T>(
  url: string,
  method = 'GET',
  body: BodyInit | null | undefined = undefined,
  headers: HeadersInit | Record<string, never> = {}
): Promise<T> {
  const tokenStore = useTokenStore()

  if (tokenStore.isAuthenticated) {
    headers = {
      ...headers,
      Authorization: `${tokenStore.tokenType} ${tokenStore.token}`,
    }
  }

  url = new URL(url, BASE_URL).href

  return fetch(url, { method, body, headers }).then(async (response) => {
    if (!response.ok) {
      // if status code is 401 (unauthorized), clean token store and redirect to login page
      if (response.status === 401) {
        tokenStore.clearData()
        router.push({ name: 'Login' })
      }

      const text = await response.text()
      let detail: string

      // get error detail from response body
      try {
        const json = JSON.parse(text)
        detail = json.detail
      } catch (error) {
        detail = await response.text()
      }

      throw { status: response.status, message: detail }
    }
    return camelcaseKeys(await response.json())
  })
}

export { apiFetch, BASE_URL }
