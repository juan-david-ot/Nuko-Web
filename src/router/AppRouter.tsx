import { Route, Routes } from 'react-router'
import HomePage from '../pages/HomePage'

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/overview' element={<HomePage />} />
            <Route path='/iniciar-sesion' element={<HomePage />} />
            <Route path='/registrarse' element={<HomePage />} />
        </Routes>
    )
}

export default AppRouter
