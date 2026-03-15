import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Description, ErrorMessage, FieldError, FieldGroup, Fieldset, Form, Input, Label, Surface, TextField } from '@heroui/react'
import { GoCheck } from 'react-icons/go'
import { useAuth } from '../contexts/auth/useAuth'
import * as authService from '../services/auth.service'

function LogInPage() {
    const { authUser } = useAuth()
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

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
                navigate('/home')
                console.log(data)
            })
            .catch(error => setErrors(error.response.data.error))
    }
    return (
        <article className='h-full flex justify-center items-center lg:items-start lg:pt-40'>
            <div className="flex items-center justify-center rounded-3xl bg-surface p-6">
                <Surface className="w-full min-w-95">
                    <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                        <Fieldset>
                            <Fieldset.Legend>¡Inicia sesión!</Fieldset.Legend>
                            <Description>Ha-Nuko Matata</Description>
                            <FieldGroup>
                                <TextField
                                    variant='secondary'
                                    isRequired
                                    name="identifier"
                                    type='text'
                                >
                                    <Label>Email/Nombre de usuario</Label>
                                    <Input placeholder="Introduce tu email o nombre de usuario" />
                                    <FieldError />
                                </TextField>
                                <TextField
                                    variant='secondary'
                                    isRequired
                                    name="password"
                                    type="password"
                                >
                                    <Label>Contraseña</Label>
                                    <Input placeholder="Introduce tu contraseña" />
                                    <FieldError />
                                </TextField>
                                <ErrorMessage>{errors.join('. ')}</ErrorMessage>
                            </FieldGroup>
                            <Fieldset.Actions>
                                <Button type="submit">
                                    <GoCheck />
                                    Submit
                                </Button>
                                <Button type="reset" variant="secondary">
                                    Reset
                                </Button>
                            </Fieldset.Actions>
                        </Fieldset>
                    </Form>
                </Surface>
            </div>
        </article>
    )
}

export default LogInPage
