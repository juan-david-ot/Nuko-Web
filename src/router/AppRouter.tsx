import { type JSX } from 'react'
import { Route, Routes } from 'react-router'
import HomePage from '../pages/HomePage'

function AppRouter(): JSX.Element {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
        </Routes>
    )
}

export default AppRouter
