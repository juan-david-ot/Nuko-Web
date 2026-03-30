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
    isLoading: boolean,
    logOut: () => void
}

export type Core = {
    id?: string
    name?: string
    creatorId?: string
    createdAt?: Date
}

export type CoreContextType = {
    cores: Core[]
    setCores: React.Dispatch<React.SetStateAction<Core[]>>
    core: Selection
    setCore: React.Dispatch<React.SetStateAction<Selection>>
    refreshCores: () => Promise<void>
}

export type Theme = 'light' | 'dark'

export type ThemeContextType = {
    theme: Theme
    toggleTheme: () => void
}
