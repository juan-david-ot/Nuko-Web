import { Route, Routes } from 'react-router'
import HomePage from '../pages/HomePage'
import LogInPage from '../pages/LogInPage'
import SignUpPage from '../pages/SignUpPage'
import PrivateRouter from './PrivateRouter'

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/iniciar-sesion' element={<LogInPage />} />
            <Route path='/registrarse' element={<SignUpPage />} />
            <Route element={<PrivateRouter />}>
                <Route path='/home' element={<HomePage />} />
                <Route path='/overview' element={<HomePage />} />
            </Route>
        </Routes>
    )
}

export default AppRouter
