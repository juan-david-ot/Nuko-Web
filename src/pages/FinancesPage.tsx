import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button, ErrorMessage, InputGroup, Label, Popover, TextField } from '@heroui/react'
import { TbMoonFilled, TbSunLowFilled } from 'react-icons/tb'
import { BiCopy } from 'react-icons/bi'
import { FaLink } from 'react-icons/fa6'
import { useAuth } from '../contexts/auth/useAuth'
import { useTheme } from '../contexts/theme/useTheme'
import coreService from '../services/core.service'

function FinancesPage() {
    const { coreId } = useParams()
    const navigate = useNavigate()

    const { logOut } = useAuth()
    const { theme, toggleTheme } = useTheme()

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

    return (
        <article className='h-full flex flex-col justify-center items-center text-center lg:justify-start lg:pt-40'>
            <h1 className="text-7xl font-bold tracking-tight">
                Esta sera la FinancesPage
            </h1>
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

export default FinancesPage
