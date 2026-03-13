import './App.css'
import AppRouter from './router/AppRouter'
import Navbar from './components/Navbar'

function App() {
    return (
        <main className='m-0 h-screen grid justify-center bg-background text-foreground'>
            <title>Nuko</title>
            <Navbar />
            <AppRouter />
        </main>
    )
}

export default App
