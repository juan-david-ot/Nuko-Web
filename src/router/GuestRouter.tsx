import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../contexts/auth/useAuth'

function GuestRouter() {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (user) {
        return <Navigate to='/home' />
    }

    return <Outlet />
}

export default GuestRouter
