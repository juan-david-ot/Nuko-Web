import { lazy } from 'react'
import { Route, Routes } from 'react-router'
const GuestRouter = lazy(() => import('./GuestRouter.tsx'))
const PrivateRouter = lazy(() => import('./PrivateRouter.tsx'))
const GuestLayout = lazy(() => import('../layout/GuestLayout.tsx'))
const PrivateLayout = lazy(() => import('../layout/PrivateLayout.tsx'))
const InvitePage = lazy(() => import('../pages/private/InvitePage.tsx'))
const AuthPage = lazy(() => import('../pages/public/AuthPage.tsx'))
const HomePage = lazy(() => import('../pages/private/HomePage.tsx'))
const TasksPage = lazy(() => import('../pages/private/TasksPage.tsx'))
const FinancesPage = lazy(() => import('../pages/private/FinancesPage.tsx'))
const CalendarPage = lazy(() => import('../pages/private/CalendarPage.tsx'))
const SettingsPage = lazy(() => import('../pages/private/SettingsPage.tsx'))
const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage.tsx'))
const TestPage = lazy(() => import('../pages/TestPage.tsx'))

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
