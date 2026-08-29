import { useEffect, useState, type ReactNode } from 'react'
import type { Theme } from '../../definitions/types.ts'
import { ThemeContext } from './theme.context.ts'

function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>((localStorage.getItem('theme') as Theme) || 'dark')

    async function toggleTheme() {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
    }, [theme])

    return (
        <ThemeContext value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext>
    )
}

export {
    ThemeProvider
}
