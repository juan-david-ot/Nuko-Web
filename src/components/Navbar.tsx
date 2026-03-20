import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Button, Dropdown, Header, Label, Tabs, type Selection } from '@heroui/react'
import { GoHomeFill } from 'react-icons/go'
import { FaDollarSign } from 'react-icons/fa6'
import { BiAtom, BiCalendar } from 'react-icons/bi'
import { AiFillSetting } from 'react-icons/ai'
import { TbListDetails } from 'react-icons/tb'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { useTheme } from '../contexts/theme/useTheme'
import CreateCoreModal from './CreateCoreModal'
import coreService from '../services/core.service'
import { getActiveTab } from '../utils'
import type { Core } from '../definitions/types'

function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const { theme } = useTheme()

    const [userCores, setUserCores] = useState<Core[]>([])
    const [coreSelected, setCoreSelected] = useState<Selection>()
    const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 1024px)').matches)

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    function getMyCores() {
        coreService
            .getMyCores()
            .then((res) => setUserCores(res.data))
            .catch((error) => console.error(error))
    }

    useEffect(() => {
        getMyCores()

        const media = window.matchMedia('(min-width: 64rem)')

        const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
        media.addEventListener('change', listener)

        return () => media.removeEventListener('change', listener)
    }, [])

    return (
        <>
            <Dropdown isOpen={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <Button
                    className={`${theme === 'dark' ? 'bg-background border-accent/70' : 'bg-accent'} scale-105 backdrop-blur-xl border hover:scale-105 lg:w-full lg:scale-100 transition-all`}
                    variant='tertiary'
                    size={isDesktop ? 'md' : 'lg'}
                    isIconOnly
                >
                    {isDesktop ? 'Núcleos' : <BiAtom className='scale-125' />}
                </Button>
                <Dropdown.Popover className='transition-all'>
                    <Dropdown.Menu
                        selectedKeys={coreSelected}
                        selectionMode='single'
                        onSelectionChange={setCoreSelected}
                    >
                        <Dropdown.Section>
                            <Dropdown.Item
                                onAction={() => {
                                    setIsDropdownOpen(false)
                                    setIsModalOpen(true)
                                }}
                                className={`${theme === 'dark' ? 'bg-accent text-accent-foreground hover:bg-accent-hover' : 'bg-background border-2 border-accent hover:bg-background-secondary'} backdrop-blur-xl border lg:w-full lg:scale-100 transition-all`}
                            >
                                Crear núcleo
                            </Dropdown.Item>
                        </Dropdown.Section>
                        <Dropdown.Section>
                            {
                                userCores.length > 0
                                    ?
                                    <>
                                        <Header>Escoge un Núcleo</Header>
                                        {
                                            userCores.map((core) => {
                                                return (
                                                    <Dropdown.Item key={core.name} id={core.id} textValue={core.name}>
                                                        <Dropdown.ItemIndicator>
                                                            {({ isSelected }) => (isSelected ? <IoCheckmarkCircle className='text-accent scale-150' /> : null)}
                                                        </Dropdown.ItemIndicator>
                                                        <Label>{core.name}</Label>
                                                    </Dropdown.Item>
                                                )
                                            })
                                        }
                                    </>
                                    :
                                    <Header>Aun no tienes ningun núcleo...</Header>
                            }
                        </Dropdown.Section>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
            <CreateCoreModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} getCores={getMyCores} />
            <Tabs
                className="w-full"
                orientation={isDesktop ? 'vertical' : 'horizontal'}
                selectedKey={getActiveTab(location.pathname)}
                onSelectionChange={(key) => navigate(String(key))}
            >
                <Tabs.ListContainer className='w-full'>
                    <Tabs.List
                        className='w-full backdrop-blur-xl bg-accent-foreground/10 border border-white/10 lg:bg-background/80'
                        aria-label="Navbar"
                    >
                        <Tabs.Tab id="/home">
                            {isDesktop ? 'Home' : <GoHomeFill className='scale-200' />}
                            <Tabs.Indicator className={`${theme === 'dark' ? 'bg-accent-soft-hover' : 'bg-accent/60'} backdrop-blur-xl border border-white/10`} />
                        </Tabs.Tab>
                        <Tabs.Tab id="/calendario">
                            {isDesktop ? 'Calendario' : <BiCalendar className='scale-200' />}
                            <Tabs.Indicator className={`${theme === 'dark' ? 'bg-accent-soft-hover' : 'bg-accent/60'} backdrop-blur-xl border border-white/10`} />
                        </Tabs.Tab>
                        <Tabs.Tab id="/finanzas">
                            {isDesktop ? 'Finanzas' : <FaDollarSign className='scale-200' />}
                            <Tabs.Indicator className={`${theme === 'dark' ? 'bg-accent-soft-hover' : 'bg-accent/60'} backdrop-blur-xl border border-white/10`} />
                        </Tabs.Tab>
                        <Tabs.Tab id="/tareas">
                            {isDesktop ? 'Tareas' : <TbListDetails className='scale-200' />}
                            <Tabs.Indicator className={`${theme === 'dark' ? 'bg-accent-soft-hover' : 'bg-accent/60'} backdrop-blur-xl border border-white/10`} />
                        </Tabs.Tab>
                        <Tabs.Tab id="/ajustes">
                            {isDesktop ? 'Ajustes' : <AiFillSetting className='scale-200' />}
                            <Tabs.Indicator className={`${theme === 'dark' ? 'bg-accent-soft-hover' : 'bg-accent/60'} backdrop-blur-xl border border-white/10`} />
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs.ListContainer>
            </Tabs>
        </>
    )
}

export default Navbar
