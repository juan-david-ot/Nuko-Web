import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Description, ErrorMessage, FieldError, FieldGroup, Fieldset, Form, Input, Label, Surface, TextField } from '@heroui/react'
import { GoCheck } from 'react-icons/go'
import * as authService from '../services/auth.service'

function SignUpPage() {
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data: Record<string, string> = {}
        formData.forEach((value, key) => {
            data[key] = value.toString()
        })

        authService
            .signUp(data)
            .then(() => navigate('/iniciar-sesion'))
            .catch(error => setErrors(error.response.data.error))
    }
    return (
        <article className='h-full flex justify-center items-center lg:items-start lg:pt-40'>
            <div className="flex items-center justify-center rounded-3xl bg-surface p-6">
                <Surface className="w-full min-w-95">
                    <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                        <Fieldset>
                            <Fieldset.Legend>¡Regístrate!</Fieldset.Legend>
                            <Description>Ha-Nuko Matata. Convive y deja vivir.</Description>
                            <FieldGroup>
                                <TextField
                                    variant='secondary'
                                    isRequired
                                    name="email"
                                    type='email'
                                >
                                    <Label>Email</Label>
                                    <Input placeholder="Introduce tu email" />
                                    <FieldError />
                                </TextField>
                                <TextField
                                    variant='secondary'
                                    isRequired
                                    name="username"
                                    type='text'
                                >
                                    <Label>Nombre de usuario</Label>
                                    <Input placeholder="Introduce tu nombre de usuario" />
                                    <FieldError />
                                </TextField>
                                <TextField
                                    variant='secondary'
                                    name="name"
                                    type='text'
                                >
                                    <Label>Nombre</Label>
                                    <Input placeholder="Introduce tu nombre" />
                                    <FieldError />
                                </TextField>
                                <TextField
                                    variant='secondary'
                                    name="surname"
                                    type="text"
                                >
                                    <Label>Apellido</Label>
                                    <Input placeholder="Introduce tu apellido" />
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

export default SignUpPage
