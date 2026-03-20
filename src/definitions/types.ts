import type { Selection } from '@heroui/react'

export type User = {
    id?: string
    email?: string
    username?: string
    password?: string
    name?: string
    surname?: string
    createdAt?: Date
}

export type AuthUser = {
    id: string
    email: string
    username: string
}

export type AuthContextType = {
    user: AuthUser | null,
    authUser: () => void,
    loading: boolean,
    logOut: () => void
}

export type Core = {
    id?: string
    name?: string
    creatorId?: string
    createdAt?: Date
}

export type CoreContextType = {
    core: Selection
    setCore: React.Dispatch<React.SetStateAction<Selection>>
}

export type Theme = 'light' | 'dark'

export type ThemeContextType = {
    theme: Theme
    toggleTheme: () => void
}
