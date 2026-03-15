import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Tabs } from '@heroui/react'
import { AiFillSetting } from 'react-icons/ai'
import { RiShieldKeyholeFill } from 'react-icons/ri'
import { MdViewComfy } from 'react-icons/md'
import { GoHomeFill } from 'react-icons/go'

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
                <Tabs.List
                    className='w-full backdrop-blur-xl bg-background/70 border border-white/10'
                    aria-label="Navbar"
                >
                    <Tabs.Tab id="/">
                        {isDesktop ? 'Main' : <MdViewComfy size={20} />}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="/home">
                        {isDesktop ? 'Home' : <GoHomeFill size={20} />}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="/overview/1">
                        {isDesktop ? 'Overview' : <MdViewComfy size={20} />}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="/auth/iniciar-sesion">
                        {isDesktop ? 'Auth' : <RiShieldKeyholeFill size={20} />}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="/Ajustes">
                        {isDesktop ? 'Ajustes' : <AiFillSetting size={20} />}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="/1">
                        {isDesktop ? 'Main' : <MdViewComfy size={20} />}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="/2">
                        {isDesktop ? 'Main' : <MdViewComfy size={20} />}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="/3">
                        {isDesktop ? 'Main' : <MdViewComfy size={20} />}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs.ListContainer>
        </Tabs>
    )
}

export default Navbar
