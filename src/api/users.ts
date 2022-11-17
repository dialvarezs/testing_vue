import { apiFetch } from '.'
import { NewUser, User } from '../interfaces'

async function getUsers(): Promise<User[]> {
  return apiFetch('/users')
}

async function getUserMe(): Promise<User> {
  return apiFetch('/users/me')
}

async function postUser(userData: NewUser): Promise<User> {
  return apiFetch('/users/', 'POST', JSON.stringify(userData), {
    'Content-Type': 'application/json',
  })
}

export { getUsers, getUserMe, postUser }
