export type User = {
    id?: string
    email?: string
    username?: string
    password?: string
    name?: string
    surname?: string
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

export type Theme = 'light' | 'dark'

export type ThemeContextType = {
    theme: Theme
    toggleTheme: () => void
}
