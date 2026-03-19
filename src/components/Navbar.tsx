import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Button, Dropdown, ErrorMessage, FieldError, FieldGroup, Fieldset, Form, Header, Input, Label, Modal, Surface, Tabs, TextField, type Selection } from '@heroui/react'
import { GoCheck, GoHomeFill } from 'react-icons/go'
import { FaDollarSign } from 'react-icons/fa6'
import { BiAtom, BiCalendar } from 'react-icons/bi'
import { AiFillSetting } from 'react-icons/ai'
import { TbListDetails } from 'react-icons/tb'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { useTheme } from '../contexts/theme/useTheme'
import { getActiveTab } from '../utils'

function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const { theme } = useTheme()

    const [coreSelected, setCoreSelected] = useState<Selection>()
    const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 1024px)').matches)

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const data: Record<string, any> = {}
        formData.forEach((value, key) => {
            data[key] = value
        })

        setIsModalOpen(false)

        alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`)
    }

    useEffect(() => {
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
                                className='bg-accent text-accent-foreground'
                            >
                                Crear núcleo
                            </Dropdown.Item>
                        </Dropdown.Section>
                        <Dropdown.Section>
                            <Header>Escoge un Núcleo</Header>
                            <Dropdown.Item id="casaSanchezID" textValue="Casa Sanchez">
                                <Dropdown.ItemIndicator>
                                    {({ isSelected }) => (isSelected ? <IoCheckmarkCircle className='text-accent scale-150' /> : null)}
                                </Dropdown.ItemIndicator>
                                <Label>Casa Sanchez</Label>
                            </Dropdown.Item>
                            <Dropdown.Item id="pisoLosChavalesID" textValue="Piso Los Chavales">
                                <Dropdown.ItemIndicator>
                                    {({ isSelected }) => (isSelected ? <IoCheckmarkCircle className='text-accent scale-150' /> : null)}
                                </Dropdown.ItemIndicator>
                                <Label>Piso Los Chavales</Label>
                            </Dropdown.Item>
                            <Dropdown.Item id="viajeSevillaID" textValue="Viaje Sevilla">
                                <Dropdown.ItemIndicator>
                                    {({ isSelected }) => (isSelected ? <IoCheckmarkCircle className='text-accent scale-150' /> : null)}
                                </Dropdown.ItemIndicator>
                                <Label>Viaje Sevilla</Label>
                            </Dropdown.Item>
                            <Dropdown.Item id="casaConSaraID" textValue="Casa Con Sara">
                                <Dropdown.ItemIndicator>
                                    {({ isSelected }) => (isSelected ? <IoCheckmarkCircle className='text-accent scale-150' /> : null)}
                                </Dropdown.ItemIndicator>
                                <Label>Casa Con Sara</Label>
                            </Dropdown.Item>
                        </Dropdown.Section>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
            <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                <div className='flex flex-col justify-center items-center'>
                    <Modal.Backdrop variant='blur'>
                        <Modal.Container placement='center' size='xs'>
                            <Modal.Dialog className="sm:max-w-md">
                                {/* <Modal.CloseTrigger /> */}
                                <Modal.Header>
                                    <Modal.Icon className="bg-accent text-accent-foreground">
                                        <BiAtom className="scale-125" />
                                    </Modal.Icon>
                                    <Modal.Heading>¡Crea un Nuevo Núcleo!</Modal.Heading>
                                </Modal.Header>
                                <Modal.Body className="p-6">
                                    <Surface variant="default">
                                        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                                            <Fieldset>
                                                <FieldGroup>
                                                    <TextField
                                                        variant='secondary'
                                                        className="w-full"
                                                        isRequired
                                                        name="name"
                                                        type="text"
                                                    >
                                                        <Label>Nombre</Label>
                                                        <Input placeholder="Nombre de tu nuevo Núcleo" />
                                                        <FieldError>Este campo es obligatorio</FieldError>
                                                    </TextField>
                                                    <ErrorMessage>{[].join('. ')}</ErrorMessage>
                                                </FieldGroup>
                                                <Fieldset.Actions className='flex-row-reverse justify-start'>
                                                    <Button type="submit">
                                                        <GoCheck />
                                                        Submit
                                                    </Button>
                                                    <Button slot='close' variant="tertiary">
                                                        Cancel
                                                    </Button>
                                                </Fieldset.Actions>
                                            </Fieldset>
                                        </Form>
                                    </Surface>
                                </Modal.Body>
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </div>
            </Modal>
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
