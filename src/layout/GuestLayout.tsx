import { Outlet } from 'react-router'

function GuestLayout() {
    return (
        <article className='h-screen w-screen overflow-y-auto overflow-x-hidden lg:flex-6'>
            <Outlet />
        </article>
    )
}

export default GuestLayout
