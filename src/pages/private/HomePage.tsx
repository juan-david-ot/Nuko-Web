import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { Avatar, Button, Card, Description, ErrorMessage, InputGroup, Label, ListBox, ListLayout, Modal, Popover, Skeleton, Surface, Tabs, TextField, Typography, Virtualizer, type Selection } from '@heroui/react'
import { BiCalendar, BiCopy } from 'react-icons/bi'
import { FaDollarSign, FaPlus, FaRegFaceLaughBeam, FaRegFaceMeh, FaRegFaceTired } from 'react-icons/fa6'
import { TbListDetails } from 'react-icons/tb'
import type { Core, User } from '../../definitions/types.ts'
import { HOME_TABS } from '../../definitions/consts.ts'
import { useAuth } from '../../contexts/auth/useAuth.ts'
import { useCore } from '../../contexts/core/useCore.ts'
import coreService from '../../services/core.service.ts'
import { capitalize, getCapitals } from '../../utils/index.ts'

function HomePage() {
    const { coreId: coreIdParam } = useParams()

    const { user } = useAuth()
    const { core } = useCore()

    const dragContainerRef = useRef<HTMLDivElement>(null)
    const startKeyRef = useRef<string | null>(null)

    const [selectedKey, setSelectedKey] = useState('resumen')
    const [isDragging, setIsDragging] = useState(false)
    const [dragKey, setDragKey] = useState<string | null>(null)
    const [coreInformation, setCoreInformation] = useState<Core>()
    const [isLoading, setIsLoading] = useState(false)
    const [inviteLink, setInviteLink] = useState()
    const [error, setError] = useState()
    const [selected, setSelected] = useState<Selection>(new Set(['1']))
    const [isModalOpen, setIsModalOpen] = useState(false)

    const selectedItems = Array.from(selected)
    const coreIdContext = Array.from(core)[0]
    const visualKey = dragKey ?? selectedKey

    function keyAtPoint(x: number, y: number) {
        const container = dragContainerRef.current
        if (!container) return null
        const tabEls = container.querySelectorAll('[role="tab"]')
        for (let i = 0; i < tabEls.length; i++) {
            const rect = tabEls[i].getBoundingClientRect()
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                return HOME_TABS[i] ?? null
            }
        }
        return null
    }

    function handlePointerDown(e: React.PointerEvent) {
        const key = keyAtPoint(e.clientX, e.clientY)
        startKeyRef.current = key
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
        if (isDragging && dragKey) {
            setSelectedKey(dragKey)
        }
        setIsDragging(false)
        setDragKey(null)
        startKeyRef.current = null
    }

    function createInvitation() {
        coreService
            .createInvitationToCore(String(coreIdContext || coreIdParam))
            .then(({ data }) => {
                setInviteLink(data.inviteLink)
                setError(undefined)
            })
            .catch((error) => setError(error.response.data.error))
    }

    function copyLink() {
        if (!inviteLink) return
        navigator.clipboard.writeText(inviteLink)
    }

    useEffect(() => {
        if (coreIdContext || coreIdParam) {
            setIsLoading(true)
            coreService
                .getUserCoreInformationById(String(coreIdContext || coreIdParam))
                .then(({ data }) => setCoreInformation(data))
                .catch((error) => {
                    setCoreInformation(undefined)
                    console.error(error)
                })
                .finally(() => setIsLoading(false))
        }
        else {
            setCoreInformation(undefined)
        }
    }, [coreIdContext || coreIdParam])

    return (
        <article className='pt-2 flex flex-col justify-center items-center text-center'>
            <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                <div className='flex flex-col justify-center items-center'>
                    <Modal.Backdrop variant='blur'>
                        <Modal.Container placement='center' size='xs'>
                            <Modal.Dialog className="sm:max-w-md">
                                <Modal.Header>
                                    <Modal.Heading>¡Comparte la invitacion!</Modal.Heading>
                                </Modal.Header>
                                <Modal.Body className="p-6">
                                    <TextField className="w-full" defaultValue='invitacion' value={inviteLink} name="website">
                                        <InputGroup className='bg-background-secondary'>
                                            <InputGroup.Input className="w-full" disabled />
                                            <InputGroup.Suffix className="pr-0">
                                                <Popover>
                                                    <Button className='active:bg-accent/75' isIconOnly aria-label="Copy" size="sm" variant="ghost" isDisabled={!inviteLink} onClick={copyLink}>
                                                        <BiCopy className="size-6" />
                                                    </Button>
                                                    <Popover.Content placement="top">
                                                        <Popover.Dialog>
                                                            <Popover.Arrow />
                                                            <p className="text-sm">¡Copiado!</p>
                                                        </Popover.Dialog>
                                                    </Popover.Content>
                                                </Popover>
                                            </InputGroup.Suffix>
                                        </InputGroup>
                                        <ErrorMessage>{error && 'No tienes ningun nucleo seleccionado o ha habido un error al crear la invitacion'}</ErrorMessage>
                                    </TextField>
                                </Modal.Body>
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </div>
            </Modal>
            <Tabs
                className="w-full flex flex-col items-center lg:w-11/12 lg:flex-row lg:flex-wrap lg:justify-between"
                variant="secondary"
                selectedKey={visualKey}
                onSelectionChange={(key) => setSelectedKey(key as string)}
            >
                <div className='w-11/12 flex flex-col justify-start items-start text-start lg:w-1/4'>
                    <Typography color='muted' type='h6' className=''>Buenos días</Typography>
                    <Typography type='h5' className=''>{capitalize(String(user?.username))}</Typography>
                </div>
                <Tabs.ListContainer
                    className='w-full sticky top-0 z-10 bg-background lg:w-2/4'
                    ref={dragContainerRef}
                    onPointerDownCapture={handlePointerDown}
                    onPointerMoveCapture={handlePointerMove}
                    onPointerUp={handlePointerUp}
                >
                    <Tabs.List aria-label="Options">
                        <Tabs.Tab id="resumen">
                            Resumen
                            <Tabs.Indicator />
                        </Tabs.Tab>
                        <Tabs.Tab id="nucleo">
                            Nucleo
                            <Tabs.Indicator />
                        </Tabs.Tab>
                        <Tabs.Tab id="chat">
                            Chat
                            <Tabs.Indicator />
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs.ListContainer>
                <Tabs.Panel className="w-full pt-4 flex flex-col justify-center items-center gap-2" id="resumen">
                    {
                        isLoading
                            ?
                            <>
                                <Skeleton className='w-11/12 h-28 mx-auto rounded-3xl md:w-full' />
                                <div className='w-full flex flex-col justify-center items-center gap-2 md:flex-row md:items-stretch'>
                                    <Skeleton className='w-11/12 h-28 rounded-3xl md:w-full' />
                                    <Skeleton className='w-11/12 h-28 rounded-3xl md:w-full' />
                                </div>
                            </>
                            :
                            coreInformation
                                ?
                                <>
                                    <Card className="w-11/12 md:w-full" variant="default">
                                        <Card.Header>
                                            <Card.Title className='flex items-center gap-3'><BiCalendar className='scale-150' /><Typography>Próximos Eventos</Typography></Card.Title>
                                        </Card.Header>
                                        <Card.Content className='md:flex md:flex-row md:gap-10'>
                                            <Typography>Cumpleaños Mama</Typography>
                                            <Typography color='muted'>Cena con Sara</Typography>
                                            <Typography color='muted'>Cine en Familia</Typography>
                                            <Typography color='muted'>Veterinario</Typography>
                                        </Card.Content>
                                    </Card>
                                    <div className='w-full flex flex-col justify-center items-center gap-2 md:flex-row md:items-stretch'>
                                        <Card className="w-11/12 md:w-full" variant="default">
                                            <Card.Header>
                                                <Card.Title className='flex items-center gap-3'><TbListDetails className='scale-150' /><Typography>Tareas Pendientes</Typography></Card.Title>
                                            </Card.Header>
                                            <Card.Content className='md:flex md:flex-row md:gap-10'>
                                                <Typography>Comprar Fruta</Typography>
                                                <Typography color='muted'>Llamar al banco</Typography>
                                                <Typography color='muted'>Ordenar el trastero</Typography>
                                            </Card.Content>
                                        </Card>
                                        <Card className="w-11/12 md:w-full" variant="default">
                                            <Card.Header>
                                                <Card.Title className='flex items-center gap-3'><FaDollarSign className='scale-150' /><Typography>Últimos Gastos</Typography></Card.Title>
                                            </Card.Header>
                                            <Card.Content className='md:flex md:flex-row md:gap-10'>
                                                <Typography>Netflix: 12€</Typography>
                                                <Typography color='muted'>Helado: 10€</Typography>
                                                <Typography color='muted'>Cena Familiar: 100€</Typography>
                                            </Card.Content>
                                        </Card>
                                    </div>
                                </>
                                :
                                <Typography>No hay ningun núcleo activo, selecciona o crea uno</Typography>
                    }
                </Tabs.Panel>
                <Tabs.Panel className="w-full pt-4 flex flex-col justify-center items-center gap-2 md:flex-row md:justify-around md:items-start" id="nucleo">
                    {
                        isLoading
                            ?
                            <>
                                <section className='flex flex-col justify-center items-center'>
                                    <Skeleton className='w-36 h-7 mx-auto rounded-xl' />
                                    <Skeleton className='w-75 h-20 mt-5 rounded-3xl' />
                                    <Skeleton className='w-75 h-40 mt-5 rounded-3xl' />
                                </section>
                                <section className='flex flex-col justify-center items-center'>
                                    <Skeleton className='w-20 h-7 mx-auto rounded-xl' />
                                    <Skeleton className='w-75 h-24 mt-5 rounded-3xl' />
                                    <Skeleton className='w-75 h-20 mt-5 rounded-3xl' />
                                </section>
                            </>
                            :
                            coreInformation
                                ?
                                <>
                                    <section className='flex flex-col justify-center items-center'>
                                        <Typography color='muted'>Ajustes del Núcleo</Typography>
                                        <Surface className="w-75 mt-5 rounded-3xl shadow-surface">
                                            <Typography className='ml-5 my-2'>Núcleo</Typography>
                                            <div className='w-full ml-5 my-2 flex flex-row'>
                                                <Typography>Nombre:</Typography>
                                                <Typography className='w-full px-5'>{coreInformation?.name}</Typography>
                                            </div>
                                        </Surface>
                                        <Surface className="w-75 mt-5 rounded-3xl shadow-surface">
                                            <Typography className='ml-5 my-2'>Miembros</Typography>
                                            <Virtualizer layout={ListLayout}>
                                                <ListBox
                                                    className='max-h-52 w-full px-0 overflow-y-auto scrollbar-gutter-stable scrollbar-thin'
                                                    aria-label="Users"
                                                    items={coreInformation.users}
                                                >
                                                    {(user: User) => (
                                                        <ListBox.Item id={user.id} textValue={user.name} className='w-11/12 mx-auto'>
                                                            <Avatar color='default'>
                                                                <Avatar.Image
                                                                    alt={user.username}
                                                                    src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
                                                                />
                                                                <Avatar.Fallback>{getCapitals(String(user.name))}</Avatar.Fallback>
                                                            </Avatar>
                                                            <div className="flex flex-col">
                                                                <Label>@{capitalize(String(user.username))} - {user.name}</Label>
                                                                <Description>{user.email}</Description>
                                                            </div>
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                    )}
                                                </ListBox>
                                            </Virtualizer>
                                            <Button
                                                className='w-11/12 my-2'
                                                onClick={() => {
                                                    setIsModalOpen(true)
                                                    createInvitation()
                                                }}
                                            >
                                                <FaPlus className='scale-90' /> Invitar Miembro
                                            </Button>
                                        </Surface>
                                    </section>
                                    <section className='flex flex-col justify-center items-center'>
                                        <Typography color='muted'>Psicología</Typography>
                                        <Surface className="w-75 mt-5 rounded-3xl shadow-surface">
                                            <Typography className='ml-5 my-2'>¿Como te sientes hoy?</Typography>
                                            <div className='w-full p-1 flex flex-row justify-around gap-5'>
                                                <Button variant='outline' className='w-full'><FaRegFaceLaughBeam /></Button>
                                                <Button variant='outline' className='w-full'><FaRegFaceMeh /></Button>
                                                <Button variant='outline' className='w-full'><FaRegFaceTired /></Button>
                                            </div>
                                        </Surface>
                                        <Surface className="w-75 mt-5 rounded-3xl shadow-surface">
                                            <Typography className='ml-5 my-2'>Reflexión del día</Typography>
                                            <Typography className='ml-5 my-2'>Comunicar antes que asumir</Typography>
                                        </Surface>
                                    </section>
                                </>
                                :
                                <Typography>No hay ningun núcleo activo, selecciona o crea uno</Typography>
                    }

                </Tabs.Panel>
                <Tabs.Panel className="w-full pt-4 flex flex-col justify-center items-center" id="chat">
                    {
                        coreInformation
                            ?
                            <Typography>Aqui va a ir el chat</Typography>
                            :
                            <Typography>No hay ningun núcleo activo, selecciona o crea uno</Typography>
                    }
                </Tabs.Panel>
            </Tabs>

            {/* <h1 className='text-7xl font-bold tracking-tight'>
                {
                    `¡Hola! @${user?.username}. Bienvenid@`
                }
            </h1>
            <h2 className='text-6xl font-semibold tracking-tight'>
                {
                    `Ahora mismo ${coreInformation ? `${coreInformation.name} esta activo` : 'no hay ningun nucleo activo'}`
                }
            </h2>
            {
                coreInformation &&
                <>
                    <h2 className='text-5xl font-semibold tracking-tight'>
                        Miembros
                    </h2>
                    {
                        <Virtualizer layout={ListLayout} layoutOptions={{ rowHeight: 50 }}>
                            <ListBox
                                aria-label='Virtualized list with 1000 items'
                                className="overflow-y-auto h-100 w-75"
                                items={coreInformation.users}
                            >
                                {(user: User) => (
                                    <ListBox.Item id={user.id} textValue={user.name}>
                                        <div className="flex flex-col">
                                            <Label>{user.username}</Label>
                                            <Description>{user.email}</Description>
                                        </div>
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                )}
                            </ListBox>
                        </Virtualizer>
                    }
                </>
            }
            <section className='flex gap-3.5'>
                <Button
                    className='bg-accent hover:scale-110 hover:bg-accent transition-all'
                    onClick={createInvitation}
                >
                    Crear Invitacion
                </Button>
                <Button
                    className='bg-accent scale-125 hover:scale-150 hover:bg-accent transition-all'
                    isIconOnly
                    onClick={toggleTheme}
                >
                    {theme === 'dark' ? <TbSunLowFilled /> : <TbMoonFilled />}
                </Button>
                <Button
                    className='bg-accent hover:scale-110 hover:bg-accent transition-all'
                    onClick={closeSession}
                >
                    Cerrar sesion
                </Button>
            </section>
            <section className='w-full flex justify-center'>
                <TextField className="w-full max-w-80" defaultValue='invitacion' value={inviteLink} name="website">
                    <Label>Generar invitacion</Label>
                    <InputGroup>
                        <InputGroup.Prefix>
                            <Button className='active:bg-accent/75' isIconOnly aria-label="Copy" size="sm" variant="ghost" onClick={createInvitation}>
                                <FaLink className="size-6" />
                            </Button>
                        </InputGroup.Prefix>
                        <InputGroup.Input className="w-full" disabled />
                        <InputGroup.Suffix className="pr-0">
                            <Popover>
                                <Button className='active:bg-accent/75' isIconOnly aria-label="Copy" size="sm" variant="ghost" isDisabled={!inviteLink} onClick={copyLink}>
                                    <BiCopy className="size-6" />
                                </Button>
                                <Popover.Content placement="top">
                                    <Popover.Dialog>
                                        <Popover.Arrow />
                                        <p className="text-sm">¡Copiado!</p>
                                    </Popover.Dialog>
                                </Popover.Content>
                            </Popover>
                        </InputGroup.Suffix>
                    </InputGroup>
                    <ErrorMessage>{error && 'No tienes ningun nucleo seleccionado o ha habido un error al crear la invitacion'}</ErrorMessage>
                </TextField>
            </section> */}
        </article>
    )
}

export default HomePage
