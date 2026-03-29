import { useLocation, useNavigate } from 'react-router'
import { Button, Dropdown, Header, Label } from '@heroui/react'
import { BiAtom } from 'react-icons/bi'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { useTheme } from '../../contexts/theme/useTheme'
import { useCore } from '../../contexts/core/useCore'
import { useMediaQuery } from '../../hooks'
import { getActiveTab } from '../../utils'

type Props = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function CoreDropdown({ isOpen, setIsOpen, setIsModalOpen }: Props) {
    const location = useLocation()
    const navigate = useNavigate()

    const { theme } = useTheme()
    const { cores, core, setCore } = useCore()

    const isDesktop = useMediaQuery('(min-width: 1024px)')

    return (
        <Dropdown isOpen={isOpen} onOpenChange={setIsOpen} className='transition-all'>
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
                                setIsOpen(false)
                                setIsModalOpen(true)
                            }}
                            className={`${theme === 'dark' ? 'bg-accent text-accent-foreground hover:bg-accent-hover' : 'bg-background border-2 border-accent hover:bg-background-secondary'} backdrop-blur-xl border lg:w-full lg:scale-100 transition-all`}
                        >
                            Crear núcleo
                        </Dropdown.Item>
                    </Dropdown.Section>
                    <Dropdown.Section>
                        {
                            cores.length > 0
                                ?
                                <>
                                    <Header>Escoge un Núcleo</Header>
                                    {
                                        cores.map((core) => {
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
        </Dropdown>
    )
}

export default CoreDropdown
