import { Outlet } from 'react-router'

function GuestLayout() {
    return (
        <article className='h-screen w-screen lg:flex-6'>
            <Outlet />
        </article>
    )
}

export default GuestLayout
