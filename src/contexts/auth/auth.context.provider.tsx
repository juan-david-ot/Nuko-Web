import { useEffect, useState, type ReactNode } from 'react'
import type { AuthUser } from '../../definitions/types.ts'
import { AuthContext } from './auth.context.tsx'
import authService from '../../services/auth.service.ts'


function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    async function authUser() {
        const token = localStorage.getItem('authToken')

        if (token) {
            authService
                .verify()
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
        <AuthContext value={{ user, isLoading, authUser, logOut }}>
            {children}
        </AuthContext>
    )
}

export {
    AuthProvider
}
