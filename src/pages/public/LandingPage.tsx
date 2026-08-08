import { useNavigate } from 'react-router'
import { Button } from '@heroui/react'

function LandingPage() {
    const navigate = useNavigate()

    return (
        <section className='flex min-h-screen items-center justify-center'>
            <Button
                className='bg-accent hover:scale-110 hover:bg-accent transition-all'
                onClick={() => navigate('/home')}
            >
                Ir a la aplicación
            </Button>
        </section>
    )
}

export default LandingPage
