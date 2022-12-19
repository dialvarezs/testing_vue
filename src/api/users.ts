import snakecaseKeys from 'snakecase-keys'

import { apiFetch } from '@/api'
import { Group, User, UserEdit } from '@/interfaces'

async function getUsers(): Promise<User[]> {
  return apiFetch('/users')
}

async function getUser(userId: number | null = null): Promise<User> {
  // if userId is not provided, get current user
  const url = userId === null ? '/users/me' : `/users/${userId}`
  return apiFetch(url)
}

async function postUser(userData: UserEdit): Promise<User> {
  return apiFetch('/users/', 'POST', JSON.stringify(snakecaseKeys(userData)), {
    'Content-Type': 'application/json',
  })
}

async function patchUser(userId: number, userData: UserEdit): Promise<User> {
  return apiFetch(
    `/users/${userId}`,
    'PATCH',
    JSON.stringify(snakecaseKeys(userData)),
    {
      'Content-Type': 'application/json',
    }
  )
}

async function setUserImage(userId: number, image: File): Promise<void> {
  const formData = new FormData()
  formData.append('file', image)
  return apiFetch(`/users/${userId}/image`, 'POST', formData)
}

async function changePassword(
  oldPassword: string,
  newPassword: string,
  userId: number | null = null
): Promise<void> {
  const url = `/users/${userId === null ? 'me' : userId}/change-password`

  return apiFetch(
    url,
    'POST',
    JSON.stringify(snakecaseKeys({ oldPassword, newPassword })),
    {
      'Content-Type': 'application/json',
    }
  )
}

async function getGroups(): Promise<Group[]> {
  return apiFetch('/groups')
}

export {
  getUsers,
  getUser,
  postUser,
  patchUser,
  setUserImage,
  changePassword,
  getGroups,
}
