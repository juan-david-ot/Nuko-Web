export type TestType = {
    test: string
}

export type Theme = 'light' | 'dark'

export type ThemeContextType = {
    theme: Theme
    toggleTheme: () => void
}
