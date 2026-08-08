import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Tabs } from '@heroui/react'
import { AiFillSetting } from 'react-icons/ai'
import { BiCalendar } from 'react-icons/bi'
import { FaDollarSign } from 'react-icons/fa6'
import { GoHomeFill } from 'react-icons/go'
import { TbListDetails } from 'react-icons/tb'
import { TABS } from '../../definitions/consts.ts'
import { useAuth } from '../../contexts/auth/useAuth.ts'
import { useCore } from '../../contexts/core/useCore.ts'
import { useTheme } from '../../contexts/theme/useTheme.ts'
import { useMediaQuery } from '../../hooks/index.ts'
import CoreDropdown from './CoreDropdown.tsx'
import CoreModal from './CoreModal.tsx'
import { getActiveTab } from '../../utils/index.ts'

// const TAB_ORDER = ['/home', '/calendario', '/finanzas', '/tareas', '/ajustes']

function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const { coreId: coreIdParam } = useParams()

    const { authUser } = useAuth()
    const { core, setCore, cores, refreshCores } = useCore()
    const { theme } = useTheme()

    // console.log('coreId', coreId)
    // console.log('core', Array.from(core)[0])

    const isDesktop = useMediaQuery('(min-width: 1024px)')

    const dragContainerRef = useRef<HTMLDivElement>(null)
    const startKeyRef = useRef<string | null>(null)

    const [isDragging, setIsDragging] = useState(false)
    const [dragKey, setDragKey] = useState<string | null>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const coreIdContext = Array.from(core)[0]
    const activeTab = getActiveTab(location.pathname)
    const visualKey = dragKey ?? activeTab

    // const isPrivateRoute = /^\/(home|tareas|finanzas|calendario|ajustes)/.test(location.pathname)

    function getCores() {
        setIsLoading(true)
        return refreshCores().finally(() => setIsLoading(false))
    }

    function keyAtPoint(x: number, y: number) {
        const container = dragContainerRef.current
        if (!container) return null
        const tabEls = container.querySelectorAll('[role="tab"]')
        for (let i = 0; i < tabEls.length; i++) {
            const rect = tabEls[i].getBoundingClientRect()
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                return TABS[i] ?? null
            }
        }
        return null
    }

    function handlePointerDown(e: React.PointerEvent) {
        e.currentTarget.setPointerCapture(e.pointerId)
        startKeyRef.current = keyAtPoint(e.clientX, e.clientY)
    }

    function handlePointerMove(e: React.PointerEvent) {
        if (e.buttons === 0) return
        const key = keyAtPoint(e.clientX, e.clientY)
        if (!key) return

        if (key !== startKeyRef.current) {
            if (!isDragging) setIsDragging(true)
            setDragKey(key)
        }
        else if (isDragging) {
            setDragKey(key)
        }
    }

    function handlePointerUp() {
        if (isDragging && dragKey && dragKey !== activeTab) {
            commitNavigation(dragKey)
        }
        else {
            setDragKey(null)
        }
        setIsDragging(false)
    }

    function commitNavigation(key: string) {
        authUser()
        if (!coreIdContext) navigate(key)
        if (coreIdContext) navigate(`${key}/${coreIdContext}`)
    }

    useEffect(() => {
        getCores()
    }, [])

    // useEffect(() => {
    //     console.log('useEffect', coreId)
    // }, [coreId])
    useEffect(() => {
        if (dragKey && dragKey === activeTab) setDragKey(null)
    }, [activeTab, dragKey])

    useEffect(() => {
        // if (!isPrivateRoute) return
        if (isLoading) return

        const baseRoute = getActiveTab(location.pathname)
        if ((coreIdContext && cores.some((core) => core.id === coreIdContext)) || (coreIdParam && cores.some((core) => core.id === coreIdParam))) {
            setCore(new Set([coreIdContext || String(coreIdParam)]))
            navigate(`${baseRoute}/${coreIdContext || coreIdParam}`, { replace: true })
        }
        // if (!Array.from(core)[0] || !cores.some((c) => c.id === Array.from(core)[0])) {
        else {
            setCore(new Set())
            navigate(`${baseRoute}`, { replace: true })
        }
    }, [location.pathname, cores])

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
            <div className='w-fit fixed bottom-20 right-0 z-50 flex flex-col items-end m-2 rounded-4xl lg:static lg:w-full lg:m-0 lg:items-start lg:bg-background-tertiary transition-all'>
                <CoreDropdown isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} setIsModalOpen={setIsModalOpen} />
            </div>
            <CoreModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} getCores={getCores} />
            <Tabs
                className="w-full fixed bottom-0 left-0 right-0 z-50 flex flex-col items-end gap-3 p-2 rounded-4xl lg:static lg:m-0 lg:p-0 lg:items-start lg:bg-background-tertiary transition-all"
                orientation={isDesktop ? 'vertical' : 'horizontal'}
                selectedKey={visualKey}
                onSelectionChange={(key) => commitNavigation(key as string)}
            >
                <div
                    ref={dragContainerRef}
                    onPointerDownCapture={handlePointerDown}
                    onPointerMoveCapture={handlePointerMove}
                    onPointerUpCapture={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    className='w-full touch-none'
                >
                    <Tabs.ListContainer className='w-full'>
                        <Tabs.List
                            className='w-full rounded-4xl backdrop-blur-xl bg-accent-foreground/10 border border-white/10 lg:bg-background/80 lg:rounded-2xl'
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
                </div>
            </Tabs>
        </>
    )
}

export default Navbar
