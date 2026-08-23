import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Description, FieldError, FieldGroup, Fieldset, Form, Input, Label, Spinner, Surface, TextField } from '@heroui/react'
import { GoCheck } from 'react-icons/go'
import authService from '../../services/auth.service'

function ForgotPasswordPage() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsLoading(true)

        const formData = new FormData(e.currentTarget)

        const email = formData.get('email') as string

        authService
            .forgotPassword(email)
            .finally(() => {
                navigate('/auth/iniciar-sesion')
                setIsLoading(false)
            })
    }

    return (
        <article className='h-full flex justify-center items-start pt-10 lg:items-start lg:pt-40'>
            <div className="flex flex-col items-center justify-center rounded-4xl bg-surface p-3">
                <Surface className='w-full pt-4 min-w-72'>
                    <Form className='flex flex-col gap-4' onSubmit={onSubmit}>
                        <Fieldset>
                            <Fieldset.Legend>Recupera tu cuenta</Fieldset.Legend>
                            <Description>Te enviaremos un correo para que restablezcas tu contraseña</Description>
                            <FieldGroup>
                                <TextField
                                    variant='secondary'
                                    isRequired
                                    name='email'
                                >
                                    <Label>Email</Label>
                                    <Input placeholder='Introduce tu email' />
                                    <FieldError>Este campo es obligatorio</FieldError>
                                </TextField>
                            </FieldGroup>
                            <Fieldset.Actions>
                                <Button type='submit'>
                                    {
                                        isLoading
                                            ?
                                            <Spinner color='current' size='lg' />
                                            :
                                            <>
                                                <GoCheck />
                                                Continuar
                                            </>
                                    }
                                </Button>
                            </Fieldset.Actions>
                        </Fieldset>
                    </Form>
                </Surface>
            </div>
        </article>
    )
}

export default ForgotPasswordPage
