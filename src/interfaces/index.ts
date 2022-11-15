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
