import { createContext, useEffect, useState, type ReactNode } from 'react'
import type { AuthUser, AuthContextType } from '../../definitions/types'
import authService from '../../services/auth.service'

const AuthContext = createContext<AuthContextType | null>(null)

function AuthProviderWrapper({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    async function authUser() {
        const token = localStorage.getItem('authToken')

        if (token) {
            authService
                .verify(token)
                .then(({ data }) => setUser(data.authUser))
                .catch(error => {
                    console.error(error)
                    logOut()
                })
                .finally(() => setIsLoading(false))
        }
        else {
            logOut()
        }
    }

    async function logOut() {
        localStorage.removeItem('authToken')
        setUser(null)
        setIsLoading(false)
    }

    useEffect(() => {
        authUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, isLoading, authUser, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProviderWrapper
}
