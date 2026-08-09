import AppRouter from './router/AppRouter.tsx'
import { useAuth } from './contexts/auth/useAuth.ts'
import { useTheme } from './contexts/theme/useTheme.ts'
import nukoLight from './assets/nuko-light-small.png'
import nukoDark from './assets/nuko-dark-small.png'

function App() {
    const { user } = useAuth()
    const { theme } = useTheme()

    return (
        <main className='m-0 h-svh w-screen overflow-hidden flex flex-col-reverse justify-between items-center lg:flex-row lg:justify-start lg:items-start bg-background text-foreground'>
            {
                user
                    ?
                    <title>{`Nuko: ${user.username}`}</title>
                    :
                    <title>Nuko</title>
            }
            <link rel='icon' type='image/svg+xml' href={theme === 'dark' ? nukoLight : nukoDark} />
            <AppRouter />
        </main>
    )
}

export default App
