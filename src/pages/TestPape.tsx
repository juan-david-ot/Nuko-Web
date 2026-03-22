import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@heroui/react'
import { useAuth } from '../contexts/auth/useAuth'
import { useTheme } from '../contexts/theme/useTheme'
import { TbMoonFilled, TbSunLowFilled } from 'react-icons/tb'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

function TestPage() {
    const navigate = useNavigate()
    const { logOut } = useAuth()
    const { theme, toggleTheme } = useTheme()

    const [count, setCount] = useState(0)

    function closeSession() {
        logOut()
        navigate('/auth/iniciar-sesion')
    }

    return (
        <article className='h-full flex flex-col justify-center items-center text-center lg:justify-start lg:pt-40'>
            <h1 className="text-7xl font-bold tracking-tight">
                Esta es la TestPage
            </h1>
            <Button
                className='bg-accent scale-125 hover:scale-150 hover:bg-accent hover:rotate-45 transition-all'
                isIconOnly
                onClick={toggleTheme}
            >
                {theme === 'dark' ? <TbSunLowFilled /> : <TbMoonFilled />}
            </Button>
            <Button
                className='bg-accent-soft transition-all hover:scale-110 hover:bg-accent hover:-rotate-45'
                onClick={closeSession}
            >
                Cerrar sesion
            </Button>
            <div>
                <a href='https://vite.dev' target='_blank' rel='noreferrer'>
                    <img src={viteLogo} className='logo' alt='Vite logo' />
                </a>
                <a href='https://react.dev' target='_blank' rel='noreferrer'>
                    <img src={reactLogo} className='logo react' alt='React logo' />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className='card'>
                <Button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </Button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className='read-the-docs'>
                Click on the Vite and React logos to learn more
            </p>
        </article>
    )
}

export default TestPage
