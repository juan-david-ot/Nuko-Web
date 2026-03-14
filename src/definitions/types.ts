export type TestType = {
    test: string
}

export type AuthUser = {
    id: string
    email: string
    username: string
}

export type AuthContextType = {
    user: unknown,
    authUser: () => void,
    isLoading: boolean,
    logOut: () => void
}

export type Theme = 'light' | 'dark'

export type ThemeContextType = {
    theme: Theme
    toggleTheme: () => void
}
