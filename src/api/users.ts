import snakecaseKeys from 'snakecase-keys'
import { apiFetch } from '@/api'
import { Group, NewUser, User } from '@/interfaces'

async function getUsers(): Promise<User[]> {
  return apiFetch('/users')
}

async function getUserMe(): Promise<User> {
  return apiFetch('/users/me')
}

async function postUser(userData: NewUser): Promise<User> {
  return apiFetch('/users/', 'POST', JSON.stringify(snakecaseKeys(userData)), {
    'Content-Type': 'application/json',
  })
}

async function getGroups(): Promise<Group[]> {
  return apiFetch('/groups')
}

export { getUsers, getUserMe, postUser, getGroups }
