import { Tabs } from '@heroui/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()

    const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 1024px)').matches)

    useEffect(() => {
        const media = window.matchMedia('(min-width: 64rem)')

        const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
        media.addEventListener('change', listener)

        return () => media.removeEventListener('change', listener)
    }, [])

    return (
        <Tabs
            className="w-full"
            orientation={isDesktop ? 'vertical' : 'horizontal'}
            selectedKey={location.pathname}
            onSelectionChange={(key) => navigate(String(key))}
        >
            <Tabs.ListContainer className='w-full'>
                <Tabs.List className='w-full backdrop-blur-xl bg-background/70 border border-white/10 rounded-4xl' aria-label="Options">
                    <Tabs.Tab id="/">
                        Home
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="/overview">
                        Overview
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="/iniciar-sesion">
                        Iniciar Ses.
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="/registrarse">
                        Registrarse
                        <Tabs.Indicator />
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs.ListContainer>
        </Tabs>
    )
}

export default Navbar
