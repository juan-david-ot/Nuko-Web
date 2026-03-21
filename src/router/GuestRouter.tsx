import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../contexts/auth/useAuth'
import Loading from '../components/Loading'

function GuestRouter() {
    const { user, loading } = useAuth()

    if (loading) {
        return <Loading />
    }

    if (user) {
        return <Navigate to='/home' />
    }

    return <Outlet />
}

export default GuestRouter
