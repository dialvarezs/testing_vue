import { apiFetch } from '.'
import { User } from '../interfaces'

async function getUsers(): Promise<User[]> {
  return apiFetch('/users')
}

async function getUserMe(): Promise<User> {
  return apiFetch('/users/me')
}

export { getUsers, getUserMe }
