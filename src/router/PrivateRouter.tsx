import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../contexts/auth/useAuth'

function PrivateRouter() {
    const { user, loading } = useAuth()

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (!user) {
        return <Navigate to='/iniciar-sesion' />
    }

    return <Outlet />
}

export default PrivateRouter
