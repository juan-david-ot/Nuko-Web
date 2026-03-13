import { type JSX } from 'react'
import './App.css'
import AppRouter from './router/AppRouter'

function App(): JSX.Element {
    return (
        <main className='m-0 h-screen grid justify-center bg-background text-foreground'>
            <title>Nuko</title>
            <AppRouter />
        </main>
    )
}

export default App
