import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button, Description, ErrorMessage, InputGroup, Label, ListBox, ListLayout, Popover, TextField, Virtualizer } from '@heroui/react'
import { TbMoonFilled, TbSunLowFilled } from 'react-icons/tb'
import { BiCopy } from 'react-icons/bi'
import { FaLink } from 'react-icons/fa6'
import type { Core, User } from '../../definitions/types'
import { useAuth } from '../../contexts/auth/useAuth'
import { useTheme } from '../../contexts/theme/useTheme'
import coreService from '../../services/core.service'

function HomePage() {
    const { coreId } = useParams()
    const navigate = useNavigate()

    const { user, logOut } = useAuth()
    const { theme, toggleTheme } = useTheme()

    const [coreInformation, setCoreInformation] = useState<Core>()
    const [inviteLink, setInviteLink] = useState()
    const [error, setError] = useState()

    function createInvitation() {
        coreService
            .createInvitationToCore(String(coreId))
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

    function closeSession() {
        logOut()
        navigate('/auth/iniciar-sesion')
    }

    useEffect(() => {
        if (coreId) {
            coreService
                .getUserCoreInformationById(coreId)
                .then(({ data }) => setCoreInformation(data))
                .catch((error) => {
                    setCoreInformation(undefined)
                    console.error(error)
                })
        }
        else {
            setCoreInformation(undefined)
        }
    }, [coreId])

    return (
        <article className='flex flex-col justify-center items-center text-center lg:justify-start lg:pt-40'>
            <h1 className='text-7xl font-bold tracking-tight'>
                {
                    `¡Hola! @${user?.username}. Bienvenid@`
                }
            </h1>
            <h2 className="text-6xl font-semibold tracking-tight">
                {
                    `Ahora mismo ${coreInformation ? `${coreInformation.name} esta activo` : 'no hay ningun nucleo activo'}`
                }
            </h2>
            {
                coreInformation &&
                <>
                    <h2 className="text-5xl font-semibold tracking-tight">
                        Miembros
                    </h2>
                    {
                        <Virtualizer layout={ListLayout} layoutOptions={{ rowHeight: 50 }}>
                            <ListBox
                                aria-label="Virtualized list with 1000 items"
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
            </section>
        </article>
    )
}

export default HomePage
