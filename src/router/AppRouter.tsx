import { Route, Routes } from 'react-router'
import GuestRouter from './GuestRouter'
import PrivateRouter from './PrivateRouter'
import InvitePage from '../pages/InvitePage'
import AuthPage from '../pages/AuthPage'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'
import TestPage from '../pages/TestPape'

function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<TestPage />} />
            <Route element={<GuestRouter />}>
                <Route path='/auth/:mode' element={<AuthPage />} />
            </Route>
            <Route element={<PrivateRouter />}>
                <Route path='/invite/:token' element={<InvitePage />} />
                <Route path='/home/:coreId' element={<HomePage />} />
                <Route path='/tareas/:coreId' element={<TestPage />} />
                <Route path='/finanzas/:coreId' element={<TestPage />} />
                <Route path='/calendario/:coreId' element={<HomePage />} />
                <Route path='/ajustes/:coreId' element={<HomePage />} />
            </Route>
            <Route path='*' element={<NotFoundPage />}></Route>
        </Routes>
    )
}

export default AppRouter
