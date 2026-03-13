import './App.css'
import AppRouter from './router/AppRouter'
import Navbar from './components/Navbar'

function App() {
    return (
        <main className='m-0 h-screen flex flex-col-reverse justify-between items-center bg-background text-foreground'>
            <title>Nuko</title>
            <nav className='m-1'>
                <Navbar />
            </nav>
            <article className='h-full'>
                <AppRouter />
            </article>
        </main>
    )
}

export default App
