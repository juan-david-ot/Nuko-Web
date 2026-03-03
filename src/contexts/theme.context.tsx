import { createContext, useEffect, useState, type ReactNode } from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {

    const [theme, setTheme] = useState<Theme>((localStorage.getItem('theme') as Theme) || 'dark')

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}

export {
    ThemeContext,
    ThemeProviderWrapper
}
