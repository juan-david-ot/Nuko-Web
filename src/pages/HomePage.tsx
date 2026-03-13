import { useState } from 'react'
import { Button } from '@heroui/react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useTheme } from '../contexts/useTheme'

function HomePage() {
    const [count, setCount] = useState(0)
    const { toggleTheme } = useTheme()
    return (
        <>
            <Button
                className='bg-accent-soft transition-all hover:scale-110 hover:bg-accent hover:rotate-45'
                onClick={toggleTheme}
            >
                Cambiar tema
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
        </>
    )
}

export default HomePage
