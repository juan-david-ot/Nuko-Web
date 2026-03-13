import { Route, Routes } from 'react-router'
import HomePage from '../pages/HomePage'
import LogInPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/iniciar-sesion' element={<LogInPage />} />
            <Route path='/registrarse' element={<SignUpPage />} />
            <Route path='/overview' element={<HomePage />} />
        </Routes>
    )
}

export default AppRouter
