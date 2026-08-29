import { createContext } from 'react'
import type { ThemeContextType } from '../../definitions/types.ts'

const ThemeContext = createContext<ThemeContextType | null>(null)

export {
    ThemeContext
}
