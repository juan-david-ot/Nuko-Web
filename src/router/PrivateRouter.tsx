import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../contexts/auth/useAuth'
import Loading from '../components/Loading'

function PrivateRouter() {
    const { user, loading } = useAuth()

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to='/auth/iniciar-sesion' />
    }

    return <Outlet />
}

export default PrivateRouter
