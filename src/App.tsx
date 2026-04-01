import AppRouter from './router/AppRouter'
import { useAuth } from './contexts/auth/useAuth'
import { useTheme } from './contexts/theme/useTheme'
import nukoLight from './assets/nuko-light-small.png'
import nukoDark from './assets/nuko-dark-small.png'

function App() {
    const { user } = useAuth()
    const { theme } = useTheme()

    return (
        <main className='m-0 h-screen w-screen overflow-hidden flex flex-col-reverse justify-between items-center lg:flex-row lg:justify-start lg:items-start bg-background text-foreground'>
            {
                user
                    ?
                    <title>{`Nuko: ${user.username}`}</title>
                    :
                    <title>Nuko</title>
            }
            <link rel='icon' type='image/svg+xml' href={theme === 'dark' ? nukoLight : nukoDark} />
            <AppRouter />
            {/*
            <article className='h-screen w-screen pb-12 lg:pb-0 lg:flex-6'>
                <AppRouter />
            </article>
            */}
        </main>
    )
}

export default App
