import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../contexts/auth/useAuth'
import Loading from '../components/Loading'

function GuestRouter() {
    const location = useLocation()
    const { user, loading } = useAuth()

    console.log(location.state?.from?.pathname)

    if (loading) {
        return <Loading />
    }

    if (user) {
        return (
            <Navigate
                to={location.state?.from?.pathname || '/home/undefined'}
                replace
            />
        )
    }

    return <Outlet />
}

export default GuestRouter
