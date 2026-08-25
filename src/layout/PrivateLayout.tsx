import { useState } from 'react'
import { Outlet } from 'react-router'
import { motion } from 'motion/react'
import Navbar from '../components/Navbar/index.ts'
import { useMediaQuery } from '../hooks/useMediaQuery.ts'

function PrivateLayout() {
    const isDesktop = useMediaQuery('(min-width: 1024px)')

    const [navWidth, setNavWidth] = useState(200)

    return (
        isDesktop
            ?
            <div className='flex h-screen w-screen'>
                <nav
                    style={{ width: navWidth }}
                    className='flex flex-col items-start gap-3 rounded-r-4xl h-full m-0 p-3 bg-background-tertiary shrink-0'
                >
                    <Navbar />
                </nav>
                <motion.div
                    drag='x'
                    dragConstraints={{ left: 0, right: 0 }}
                    dragMomentum={false}
                    dragElastic={0}
                    onDrag={(_, info) => {
                        setNavWidth((w) => Math.min(300, Math.max(120, w + info.delta.x)))
                    }}
                    className='relative w-2 cursor-col-resize shrink-0 touch-none group hover:bg-background-tertiary/75 active:bg-background-tertiary transition-colors mask-[linear-gradient(to_bottom,transparent_0%,black_30%,black_70%,transparent_100%)]'
                >
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-40 group-hover:opacity-100 transition-opacity'>
                        <span className='w-1 h-5 rounded-full bg-current' />
                    </div>
                </motion.div>
                <article className='pb-0 h-screen w-screen overflow-y-auto overflow-x-hidden scrollbar-gutter-stable m-0 flex-1'>
                    <Outlet />
                </article>
            </div>
            :
            <div>
                <nav className='flex flex-col items-end gap-3 rounded-4xl lg:static lg:h-full lg:max-w-72 lg:m-0 lg:p-3 lg:flex-1 lg:items-start lg:bg-background-tertiary transition-all'>
                    <Navbar />
                </nav>

                <article className='pb-16 h-svh w-screen overflow-y-auto overflow-x-hidden scrollbar-gutter-stable lg:pb-0 lg:m-0 lg:flex-6'>
                    <Outlet />
                </article>

            </div>
    )
}

export default PrivateLayout
