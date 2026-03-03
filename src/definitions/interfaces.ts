import type { Theme } from './types'

export interface TestInterface {
    test: string
}

export interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
}
