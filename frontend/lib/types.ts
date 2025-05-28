import * as Icons from 'lucide-vue-next'

export type Menu = {
    title: string
    slug: string
    icon?: keyof typeof Icons
    path: string
    hidden?: boolean
    disabled?: boolean
    role?: string
    permissions: string | string[]
    subMenu?: Menu[]
}

export type User = {
    role: Role
    permissions: string[]
}

export type Role = {
    id: string
    name: string
}

export type Permission = {
    id: string
    name: string
}