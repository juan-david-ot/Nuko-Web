import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../contexts/auth/useAuth'
import Loading from '../components/Loading'

function PrivateRouter() {
    const location = useLocation()
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return <Loading />
    }

    if (!user) {
        return (
            <Navigate
                to='/auth/iniciar-sesion'
                state={{ from: location }}
                replace
            />
        )
    }

    return <Outlet />
}

export default PrivateRouter
