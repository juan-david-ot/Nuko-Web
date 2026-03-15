import { Route, Routes } from 'react-router'
import GuestRouter from './GuestRouter'
import PrivateRouter from './PrivateRouter'
import AuthPage from '../pages/AuthPage'
import HomePage from '../pages/HomePage'
import ErrorPage from '../pages/ErrorPage'

function AppRouter() {
    return (
        <Routes>
            <Route element={<GuestRouter />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/auth' element={<AuthPage />} />
            </Route>
            <Route element={<PrivateRouter />}>
                <Route path='/home' element={<HomePage />} />
                <Route path='/overview/:id' element={<HomePage />} />
            </Route>
            <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
    )
}

export default AppRouter
