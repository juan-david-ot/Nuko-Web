import AppRouter from './router/AppRouter'
import { useAuth } from './contexts/auth/useAuth'
import Navbar from './components/Navbar'
import './App.css'

function App() {
    const { authenticatedUser } = useAuth()
    return (
        <main className='m-0 h-screen w-screen flex flex-col-reverse justify-between items-center lg:flex-row lg:justify-start lg:items-start bg-background text-foreground'>
            <title>Nuko</title>
            {
                authenticatedUser ?
                    <nav className='m-1 lg:m-0 lg:p-3 lg:h-full lg:max-w-72 lg:bg-background-tertiary lg:rounded-4xl lg:flex-1'>
                        <Navbar />
                    </nav>
                    :
                    null
            }
            <article className='h-full lg:flex-6'>
                <AppRouter />
            </article>
        </main>
    )
}

export default App
