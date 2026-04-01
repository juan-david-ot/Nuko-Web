import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

function PrivateLayout() {
    return (
        <>
            <nav className='flex flex-col items-end gap-3 rounded-4xl lg:static lg:h-full lg:max-w-72 lg:m-0 lg:p-3 lg:flex-1 lg:items-start lg:bg-background-tertiary transition-all'>
                <Navbar />
            </nav>

            <article className='pb-16 h-screen w-screen overflow-auto lg:m-0 lg:flex-6'>
                <Outlet />
            </article>
        </>
    )
}

export default PrivateLayout
