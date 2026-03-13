import { type JSX } from 'react'
import { Route, Routes } from 'react-router'
import HomePage from '../pages/HomePage'

function AppRouter(): JSX.Element {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/overview' element={<HomePage />} />
            <Route path='/analytics' element={<HomePage />} />
            <Route path='/reports' element={<HomePage />} />
        </Routes>
    )
}

export default AppRouter
