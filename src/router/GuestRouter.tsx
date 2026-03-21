import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../contexts/auth/useAuth'
import Loading from '../components/Loading'

function GuestRouter() {
    const location = useLocation()
    const { user, loading } = useAuth()

    if (loading) {
        return <Loading />
    }

    if (user) {
        const from = location.state?.from?.pathname || '/home'
        return (
            <Navigate
                to={from}
                replace
            />
        )
    }

    return <Outlet />
}

export default GuestRouter
