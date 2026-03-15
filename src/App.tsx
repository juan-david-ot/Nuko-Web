import AppRouter from './router/AppRouter'
import { useAuth } from './contexts/auth/useAuth'
import Navbar from './components/Navbar'
import './App.css'

function App() {
    const { user } = useAuth()

    return (
        <main className='m-0 h-screen w-screen flex flex-col-reverse justify-between items-center lg:flex-row lg:justify-start lg:items-start bg-background text-foreground'>
            <title>Nuko</title>
            {
                user ?
                    <nav
                        className="fixed bottom-0 left-0 right-0 z-50 m-2 rounded-4xl lg:static lg:m-0 lg:p-3 lg:h-full lg:max-w-72 lg:bg-background-tertiary lg:flex-1"
                    >
                        <Navbar />
                    </nav>
                    :
                    null
            }
            <article className='h-screen w-screen lg:pb-0 lg:flex-6'>
                <AppRouter />
            </article>
            {/*
            <article className='h-screen w-screen pb-12 lg:pb-0 lg:flex-6'>
                <AppRouter />
            </article>
            */}
        </main>
    )
}

export default App
