import snakecaseKeys from 'snakecase-keys'

import { apiFetch } from '@/api'
import { Group, User, UserEdit } from '@/interfaces'

async function getUsers(): Promise<User[]> {
  return apiFetch('/users')
}

async function getUser(userId: number): Promise<User> {
  return apiFetch(`/users/${userId}`)
}

async function getUserMe(): Promise<User> {
  return apiFetch('/users/me')
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

async function getGroups(): Promise<Group[]> {
  return apiFetch('/groups')
}

export { getUsers, getUser, getUserMe, postUser, patchUser, getGroups }
