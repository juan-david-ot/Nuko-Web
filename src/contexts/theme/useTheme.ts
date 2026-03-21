import { useContext } from 'react'
import { ThemeContext } from './theme.context'

function useTheme() {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error('useTheme must be used inside ThemeProviderWrapper')
    }

    return context
}

export {
    useTheme
}
