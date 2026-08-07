import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../contexts/auth/useAuth.ts'
import Loading from '../components/Loading.tsx'

function GuestRouter() {
    const location = useLocation()

    const { user, isLoading } = useAuth()

    if (isLoading) {
        return <Loading />
    }

    if (user) {
        return (
            <Navigate
                to={location.state?.from?.pathname || '/home'}
                replace
            />
        )
    }

    return <Outlet />
}

export default GuestRouter
