import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Tabs } from '@heroui/react'
import { GoHomeFill } from 'react-icons/go'
import { FaDollarSign } from 'react-icons/fa6'
import { BiCalendar } from 'react-icons/bi'
import { AiFillSetting } from 'react-icons/ai'
import { TbListDetails } from 'react-icons/tb'
import { useCore } from '../../contexts/core/useCore'
import { useTheme } from '../../contexts/theme/useTheme'
import { useMediaQuery } from '../../hooks'
import CoreDropdown from './CoreDropdown'
import CoreModal from './CoreModal'
import { getActiveTab } from '../../utils'
import { useAuth } from '../../contexts/auth/useAuth'

function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const { coreId } = useParams()

    console.log('coreId', coreId)

    const { user } = useAuth()
    console.log(user?.username)
    const { theme } = useTheme()
    const { setCore, cores, refreshCores } = useCore()

    const isDesktop = useMediaQuery('(min-width: 1024px)')

    // const [userCores, setUserCores] = useState<Core[]>([])

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    // const isPrivateRoute = /^\/(home|tareas|finanzas|calendario|ajustes)/.test(location.pathname)

    function getCores() {
        refreshCores().finally(() => setLoading(false))
    }

    useEffect(() => {
        getCores()
    }, [])

    useEffect(() => {
        // if (!isPrivateRoute) return
        if (loading) return

        console.log('coreId', coreId)

        if (coreId && cores.some((c) => c.id === coreId)) {
            setCore(new Set([coreId]))
        }
        else {
            const baseRoute = getActiveTab(location.pathname)
            navigate(`${baseRoute}/undefined`, { replace: true })
            setCore(new Set())
        }
    }, [coreId, cores])

    return (
        <>
            {/* <Dropdown isOpen={isDropdownOpen} onOpenChange={setIsDropdownOpen} className='transition-all'>
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
                        selectedKeys={core}
                        selectionMode='single'
                        onSelectionChange={(key) => {
                            setCore(key)
                            const selected = Array.from(key)[0]
                            const baseRoute = getActiveTab(location.pathname)
                            navigate(`${baseRoute}/${selected}`)
                        }}
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
                                                    <Dropdown.Item key={core.id} id={core.id} textValue={core.name}>
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
            </Dropdown> */}
            <CoreDropdown isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} setIsModalOpen={setIsModalOpen} />
            <CoreModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} getCores={getCores} />
            <Tabs
                className="w-full"
                orientation={isDesktop ? 'vertical' : 'horizontal'}
                selectedKey={getActiveTab(location.pathname)}
                onSelectionChange={(key) => {
                    // if (!isPrivateRoute) return
                    if (!coreId) return
                    navigate(`${key}/${coreId}`)
                }}
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
