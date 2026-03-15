import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Tabs } from '@heroui/react'
import { GoHomeFill } from 'react-icons/go'
import { TbListDetails } from 'react-icons/tb'
import { FaDollarSign } from 'react-icons/fa6'
import { BiCalendar } from 'react-icons/bi'
import { AiFillSetting } from 'react-icons/ai'

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
                    <Tabs.Tab id="/home">
                        {isDesktop ? 'Home' : <GoHomeFill size={25} />}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="/calendario">
                        {isDesktop ? 'Calendario' : <BiCalendar size={26} />}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="/finanzas">
                        {isDesktop ? 'Finanzas' : <FaDollarSign size={24} />}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="/tareas">
                        {isDesktop ? 'Tareas' : <TbListDetails size={25} />}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="/ajustes">
                        {isDesktop ? 'Ajustes' : <AiFillSetting size={25} />}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs.ListContainer>
        </Tabs>
    )
}

export default Navbar
