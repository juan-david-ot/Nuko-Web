import { useLocation, useNavigate } from 'react-router'
import { Button, Dropdown, Header, Label } from '@heroui/react'
import { IoCheckmarkCircle, IoLogoReact } from 'react-icons/io5'
import { useAuth } from '../../contexts/auth/useAuth.ts'
import { useCore } from '../../contexts/core/useCore.ts'
import { useTheme } from '../../contexts/theme/useTheme.ts'
import { useMediaQuery } from '../../hooks/index.ts'
import { getActiveTab } from '../../utils/index.ts'
import { PiPlusCircle } from 'react-icons/pi'

type Props = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function CoreMenu({ isOpen, setIsOpen, setIsModalOpen }: Props) {
    const location = useLocation()
    const navigate = useNavigate()

    const { authUser } = useAuth()
    const { cores, core, setCore } = useCore()
    const { theme } = useTheme()

    const isDesktop = useMediaQuery('(min-width: 1024px)')

    return (
        <Dropdown isOpen={isOpen} onOpenChange={setIsOpen} className='transition-all'>
            <Button
                className='bg-transparent scale-105 backdrop-blur-xs border border-foreground/10 hover:scale-105 lg:w-full lg:bg-accent/90 lg:border-accent/90 lg:text-accent-foreground lg:scale-100 transition-all'
                variant='tertiary'
                size={isDesktop ? 'md' : 'lg'}
                isIconOnly
            >
                {isDesktop ? 'Núcleos' : <IoLogoReact className='scale-140 bg-transparent backdrop-blur-xl' />}
            </Button>
            <Dropdown.Popover className='max-h-52 bg-transparent backdrop-blur overflow-y-hidden transition-all'>
                <Dropdown.Menu>
                    <Dropdown.Section>
                        <Dropdown.Item
                            onAction={() => {
                                setIsModalOpen(true)
                            }}
                            className='hover:bg-muted/40 backdrop-blur-xl lg:w-full lg:scale-100 transition-all'
                        >
                            <PiPlusCircle className='scale-125' /> Crear núcleo
                        </Dropdown.Item>
                    </Dropdown.Section>
                </Dropdown.Menu>
                <Dropdown.Menu
                    selectedKeys={core}
                    selectionMode='single'
                    onSelectionChange={(key) => {
                        authUser()
                        setCore(key)
                        const selected = Array.from(key)[0]
                        const baseRoute = getActiveTab(location.pathname)
                        navigate(`${baseRoute}/${selected}`)
                    }}
                >
                    <Header>Escoge un Núcleo</Header>
                    <Dropdown.Section className='max-h-28 overflow-y-auto scrollbar-gutter-stable'>
                        {
                            cores.length > 0
                                ?
                                <>
                                    {
                                        cores.map((core) => (
                                            <Dropdown.Item key={core.id} id={core.id} textValue={core.name} className='hover:bg-muted/40'>
                                                <Dropdown.ItemIndicator>
                                                    {({ isSelected }) => (isSelected ? <IoCheckmarkCircle className='text-foreground scale-150' /> : null)}
                                                </Dropdown.ItemIndicator>
                                                <Label>{core.name}</Label>
                                            </Dropdown.Item>
                                        ))
                                    }
                                </>
                                :
                                <Header>Aun no tienes ningun núcleo...</Header>
                        }
                    </Dropdown.Section>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    )
}

export default CoreMenu
