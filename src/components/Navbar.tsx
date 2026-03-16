import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Button, Popover, Tabs } from '@heroui/react'
import { GoHomeFill } from 'react-icons/go'
import { TbAtom2, TbListDetails } from 'react-icons/tb'
import { FaDollarSign } from 'react-icons/fa6'
import { BiAtom, BiCalendar } from 'react-icons/bi'
import { AiFillSetting } from 'react-icons/ai'
import { getActiveTab } from '../utils'
import { FaEllipsisH } from 'react-icons/fa'
import { LuAtom } from 'react-icons/lu'

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
        <>
            <Popover>
                <Button
                    className='scale-105 backdrop-blur-xl bg-accent/85 border border-white/10 text-accent-foreground hover:scale-110 lg:w-full lg:scale-100'
                    variant='tertiary'
                    size={isDesktop ? 'md' : 'lg'}
                    isIconOnly
                >
                    {isDesktop ? 'Nucleos' : <BiAtom className='scale-125' />}
                </Button>
                <Popover.Content className="max-w-64" offset={10}>
                    <Popover.Dialog>
                        <Popover.Heading>Nucleo Activo</Popover.Heading>
                        <p className="mt-2 text-sm text-muted">
                            Aqui va a salir una lista de todos los nucleos.
                        </p>
                    </Popover.Dialog>
                </Popover.Content>
            </Popover>
            <Tabs
                className="w-full"
                orientation={isDesktop ? 'vertical' : 'horizontal'}
                selectedKey={getActiveTab(location.pathname)}
                onSelectionChange={(key) => navigate(String(key))}
            >
                <Tabs.ListContainer className='w-full'>
                    <Tabs.List
                        className='w-full backdrop-blur-xl bg-background/70 border border-white/10'
                        aria-label="Navbar"
                    >
                        <Tabs.Tab id="/home">
                            {isDesktop ? 'Home' : <GoHomeFill className='scale-200' />}
                            <Tabs.Indicator />
                        </Tabs.Tab>
                        <Tabs.Tab id="/calendario">
                            {isDesktop ? 'Calendario' : <BiCalendar className='scale-200' />}
                            <Tabs.Indicator />
                        </Tabs.Tab>
                        <Tabs.Tab id="/finanzas">
                            {isDesktop ? 'Finanzas' : <FaDollarSign className='scale-200' />}
                            <Tabs.Indicator />
                        </Tabs.Tab>
                        <Tabs.Tab id="/tareas">
                            {isDesktop ? 'Tareas' : <TbListDetails className='scale-200' />}
                            <Tabs.Indicator />
                        </Tabs.Tab>
                        <Tabs.Tab id="/ajustes">
                            {isDesktop ? 'Ajustes' : <AiFillSetting className='scale-200' />}
                            <Tabs.Indicator />
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs.ListContainer>
            </Tabs>
        </>
    )
}

export default Navbar
