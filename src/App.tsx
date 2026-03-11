import { useState, type JSX } from 'react'
import { Button } from '@heroui/react'
import { useTheme } from './contexts/useTheme'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App(): JSX.Element {
    const [count, setCount] = useState(0)
    const { toggleTheme } = useTheme()

    return (
        <main className='bg-background text-foreground'>
            <title>Nuko</title>
            <Button onClick={toggleTheme}>
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
        </main>
    )
}

export default App
