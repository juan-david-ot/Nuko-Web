import { Route, Routes } from 'react-router'
import GuestRouter from './GuestRouter'
import PrivateRouter from './PrivateRouter'
import AuthPage from '../pages/AuthPage'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'
import TestPage from '../pages/TestPape'

function AppRouter() {
    return (
        <Routes>
            <Route element={<GuestRouter />}>
                <Route path='/' element={<TestPage />} />
                <Route path='/auth/:mode' element={<AuthPage />} />
            </Route>
            <Route element={<PrivateRouter />}>
                <Route path='/home' element={<HomePage />} />
                <Route path='/overview/:id' element={<TestPage />} />
            </Route>
            <Route path='*' element={<NotFoundPage />}></Route>
        </Routes>
    )
}

export default AppRouter
