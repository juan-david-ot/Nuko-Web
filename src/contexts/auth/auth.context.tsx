import { createContext } from 'react'
import type { AuthContextType } from '../../definitions/types.ts'

const AuthContext = createContext<AuthContextType | null>(null)

export {
    AuthContext
}
