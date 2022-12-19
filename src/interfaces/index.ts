export interface Group {
  id: number
  name: string
  isActive: boolean
}

export interface User {
  id: number
  username: string
  fullname: string
  age: number
  imagePath: string
  isActive: boolean
  groups: Group[]
}

export interface UserEdit {
  username: string
  fullname: string
  password?: string
  isActive?: boolean
  age?: number | null
  image?: File[]
  groupIds?: number[]
}

export interface Token {
  accessToken: string
  tokenType: string
}
