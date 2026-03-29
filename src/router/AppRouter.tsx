import { lazy } from 'react'
import { Route, Routes } from 'react-router'
const GuestRouter = lazy(() => import('./GuestRouter'))
const PrivateRouter = lazy(() => import('./PrivateRouter'))
const GuestLayout = lazy(() => import('../layout/GuestLayout'))
const PrivateLayout = lazy(() => import('../layout/PrivateLayout'))
const InvitePage = lazy(() => import('../pages/private/InvitePage'))
const AuthPage = lazy(() => import('../pages/public/AuthPage'))
const HomePage = lazy(() => import('../pages/private/HomePage'))
const TasksPage = lazy(() => import('../pages/private/TasksPage'))
const FinancesPage = lazy(() => import('../pages/private/FinancesPage'))
const CalendarPage = lazy(() => import('../pages/private/CalendarPage'))
const SettingsPage = lazy(() => import('../pages/private/SettingsPage'))
const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage'))
const TestPage = lazy(() => import('../pages/TestPage'))

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
                    <Route path='/home/:coreId?' element={<HomePage />} />
                    <Route path='/tareas/:coreId?' element={<TasksPage />} />
                    <Route path='/finanzas/:coreId?' element={<FinancesPage />} />
                    <Route path='/calendario/:coreId?' element={<CalendarPage />} />
                    <Route path='/ajustes/:coreId?' element={<SettingsPage />} />
                </Route>
            </Route>
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRouter
