import { useNavigate } from 'react-router'
import { Accordion, Avatar, Button, Description, Label, Surface, Switch, Typography } from '@heroui/react'
import { FaCaretDown } from 'react-icons/fa6'
import { TbMoon, TbSunLow } from 'react-icons/tb'
import { useAuth } from '../../contexts/auth/useAuth.ts'
import { useTheme } from '../../contexts/theme/useTheme.ts'
import { capitalize, getCapitals } from '../../utils/index.ts'

function SettingsPage() {
    const navigate = useNavigate()

    const { user, logOut } = useAuth()
    const { theme, toggleTheme } = useTheme()

    function closeSession() {
        logOut()
        navigate('/auth/iniciar-sesion')
    }

    return (
        <article className='pt-2 flex flex-col justify-center items-center text-center'>
            <div className="w-11/12 flex flex-col items-center lg:w-11/12">
                <Typography type='h5' className='w-full'>Ajustes</Typography>
                <Surface className='w-full mt-5 flex flex-col rounded-3xl'>
                    <Accordion className="w-full flex flex-row rounded-3xl" variant="surface">
                        <Accordion.Item className="w-full" key={user?.id}>
                            <Accordion.Heading>
                                <Accordion.Trigger>
                                    <Avatar className='m-2' color='default'>
                                        <Avatar.Image
                                            alt={user?.username}
                                            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
                                        />
                                        <Avatar.Fallback>{getCapitals(String(user?.name))}</Avatar.Fallback>
                                    </Avatar>
                                    <div className="m-2 flex flex-col">
                                        <Label>@{capitalize(String(user?.username))} - {user?.name}</Label>
                                        <Description>{user?.email}</Description>
                                    </div>
                                    <Accordion.Indicator>
                                        <FaCaretDown />
                                    </Accordion.Indicator>
                                </Accordion.Trigger>
                            </Accordion.Heading>
                            <Accordion.Panel>
                                <Accordion.Body>
                                    Aqui tiene que ir la configuracion del usuario, como cambiar el nombre, el correo, la contraseña, etc.
                                </Accordion.Body>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                    <Accordion className="w-full flex flex-row rounded-3xl" variant="surface">
                        <Accordion.Item className="w-full" key={user?.id}>
                            <Accordion.Heading>
                                <Accordion.Trigger>
                                    Cambiar Contraseña
                                    <Accordion.Indicator>
                                        <FaCaretDown />
                                    </Accordion.Indicator>
                                </Accordion.Trigger>
                            </Accordion.Heading>
                            <Accordion.Panel>
                                <Accordion.Body>
                                    Aqui tiene que ir el formulario para cambiar la contraseña, con los campos de contraseña actual, nueva contraseña y confirmar nueva contraseña.
                                </Accordion.Body>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                    <Switch className='w-full p-4' size="lg" isSelected={theme === 'dark'} onChange={toggleTheme}>
                        <Switch.Content className='w-full justify-between'>
                            Modo Oscuro
                            <Switch.Control>
                                <Switch.Thumb>
                                    <Switch.Icon>{theme === 'dark' ? <TbMoon /> : <TbSunLow />}</Switch.Icon>
                                </Switch.Thumb>
                            </Switch.Control>
                        </Switch.Content>
                    </Switch>
                    <Button
                        className='w-full h-fit p-4 justify-start text-danger'
                        variant='ghost'
                        onClick={closeSession}
                    >
                        Cerrar sesion
                    </Button>
                </Surface>
            </div>
            {/* <h1 className="text-7xl font-bold tracking-tight">
                Esta sera la SettingsPage
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
            </section> */}
        </article>
    )
}

export default SettingsPage
