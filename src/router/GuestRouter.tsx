import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../contexts/auth/useAuth'

function GuestRouter() {
    const { user, loading } = useAuth()

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (user) {
        return <Navigate to='/home' />
    }

    return <Outlet />
}

export default GuestRouter
