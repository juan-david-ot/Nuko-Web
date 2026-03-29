import { lazy } from 'react'
import { Route, Routes } from 'react-router'
const GuestRouter = lazy(() => import('./GuestRouter'))
const PrivateRouter = lazy(() => import('./PrivateRouter'))
const GuestLayout = lazy(() => import('../layout/GuestLayout'))
const PrivateLayout = lazy(() => import('../layout/PrivateLayout'))
const InvitePage = lazy(() => import('../pages/InvitePage'))
const AuthPage = lazy(() => import('../pages/AuthPage'))
const HomePage = lazy(() => import('../pages/HomePage'))
const TasksPage = lazy(() => import('../pages/TasksPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))
const TestPage = lazy(() => import('../pages/TestPape'))

function AppRouter() {
    return (
        <Routes>
            <Route element={<GuestLayout />}>
                <Route path='/' element={<TestPage />} />
                <Route element={<GuestRouter />}>
                    <Route path='/auth/:mode' element={<AuthPage />} />
                </Route>
            </Route>
            <Route element={<PrivateRouter />}>
                <Route path='/invite/:token' element={<InvitePage />} />
                <Route element={<PrivateLayout />}>
                    <Route path='/home/:coreId' element={<HomePage />} />
                    <Route path='/tareas/:coreId' element={<TasksPage />} />
                    <Route path='/finanzas/:coreId' element={<TestPage />} />
                    <Route path='/calendario/:coreId' element={<HomePage />} />
                    <Route path='/ajustes/:coreId' element={<HomePage />} />
                </Route>
            </Route>
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRouter
