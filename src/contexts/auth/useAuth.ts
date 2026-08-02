import { useContext } from 'react'
import { AuthContext } from './auth.context.tsx'

function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used inside AuthProviderWrapper')
    }

    return context
}

export {
    useAuth
}
