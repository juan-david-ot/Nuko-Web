import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Button, Description, ErrorMessage, FieldError, FieldGroup, Fieldset, Form, Input, InputGroup, Label, Spinner, Surface, TextField } from '@heroui/react'
import { GoCheck } from 'react-icons/go'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useAuth } from '../../contexts/auth/useAuth'
import authService from '../../services/auth.service'

function LogInForm() {
    const location = useLocation()
    const navigate = useNavigate()
    const { authUser } = useAuth()

    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [errors, setErrors] = useState([])

    const from = location.state?.from?.pathname || '/home/undefined'

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setLoading(true)

        const formData = new FormData(e.currentTarget)

        const identifier = formData.get('identifier') as string
        const password = formData.get('password') as string

        const data = {
            ...(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(identifier) ? { email: identifier } : { username: identifier }),
            password
        }

        // /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)

        authService
            .logIn(data)
            .then(({ data }) => {
                localStorage.setItem('authToken', data.authToken)
                authUser()
                navigate(from, { replace: true })
            })
            .catch(error => setErrors(error.response.data.error))
            .finally(() => setLoading(false))
    }

    return (
        // <div className="flex flex-col items-center justify-center rounded-3xl bg-surface p-6">
        //     <Tabs
        //         className="w-fit"
        //         orientation='horizontal'
        //         selectedKey={location.pathname}
        //         onSelectionChange={(key) => navigate(String(key))}
        //     >
        //         <Tabs.ListContainer className='w-fit'>
        //             <Tabs.List
        //                 className='w-full backdrop-blur-xl bg-background/70 border border-white/10'
        //                 aria-label="Navbar"
        //             >
        //                 <Tabs.Tab id="/iniciar-sesion">
        //                     Iniciar Ses.
        //                     <Tabs.Indicator />
        //                 </Tabs.Tab>
        //                 <Tabs.Tab id="/registrarse">
        //                     Registrarse
        //                     <Tabs.Indicator />
        //                 </Tabs.Tab>
        //             </Tabs.List>
        //         </Tabs.ListContainer>
        //     </Tabs>
        <Surface className='w-full min-w-72'>
            <Form className='flex flex-col gap-4' onSubmit={onSubmit}>
                <Fieldset>
                    <Fieldset.Legend>¡Inicia sesión!</Fieldset.Legend>
                    <Description>Ha-Nuko Matata.</Description>
                    <FieldGroup>
                        <TextField
                            variant='secondary'
                            isRequired
                            name='identifier'
                        >
                            <Label>Email/Nombre de usuario</Label>
                            <Input placeholder='Introduce tu email o nombre de usuario' />
                            <FieldError>Este campo es obligatorio</FieldError>
                        </TextField>
                        <TextField
                            variant='secondary'
                            isRequired
                            name='password'
                            type={isVisible ? 'text' : 'password'}
                        >
                            <Label>Contraseña</Label>
                            <InputGroup>
                                <InputGroup.Input placeholder='Introduce tu contraseña' />
                                <InputGroup.Suffix className='pr-0'>
                                    <Button
                                        isIconOnly
                                        size='sm'
                                        variant='ghost'
                                        onClick={() => setIsVisible(!isVisible)}
                                    >
                                        {isVisible ? <AiOutlineEye className='size-6' /> : <AiOutlineEyeInvisible className='size-6' />}
                                    </Button>
                                </InputGroup.Suffix>
                            </InputGroup>
                            <FieldError>Este campo es obligatorio</FieldError>
                        </TextField>
                        <ErrorMessage>{Array.isArray(errors) ? errors.join('. ') : errors}</ErrorMessage>
                    </FieldGroup>
                    <Fieldset.Actions>
                        <Button type="submit">
                            {
                                loading
                                    ?
                                    <Spinner color='current' size='lg' />
                                    :
                                    <>
                                        <GoCheck />
                                        Iniciar Sesión
                                    </>
                            }
                        </Button>
                    </Fieldset.Actions>
                </Fieldset>
            </Form>
        </Surface>
        // </div>
    )
}

export default LogInForm
