import { apiFetch } from '.'
import { User } from '../interfaces'

async function getUsers(): Promise<User[]> {
    return apiFetch('/users')
}

export { getUsers }