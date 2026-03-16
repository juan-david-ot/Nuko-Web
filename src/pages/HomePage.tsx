import { useNavigate } from 'react-router'
import { Button } from '@heroui/react'
import { TbMoonFilled, TbSunLowFilled } from 'react-icons/tb'
import { useAuth } from '../contexts/auth/useAuth'
import { useTheme } from '../contexts/theme/useTheme'

function HomePage() {
    const navigate = useNavigate()
    const { logOut } = useAuth()
    const { theme, toggleTheme } = useTheme()

    function closeSession() {
        logOut()
        navigate('/iniciar-sesion')
    }

    return (
        <article className='h-full flex flex-col justify-center items-center text-center lg:justify-start lg:pt-40'>
            <h1 className="text-7xl font-bold tracking-tight">
                Esta sera la HomePage
            </h1>
            <section className='flex gap-3.5'>
                <Button
                    className='bg-accent scale-125 hover:scale-150 hover:bg-accent transition-all'
                    isIconOnly
                    onClick={toggleTheme}
                >
                    {theme === 'dark' ? <TbSunLowFilled /> : <TbMoonFilled />}
                </Button>
                <Button
                    className='bg-accent hover:scale-110 hover:bg-accent transition-all'
                    onClick={closeSession}
                >
                    Cerrar sesion
                </Button>
            </section>
        </article>
    )
}

export default HomePage
