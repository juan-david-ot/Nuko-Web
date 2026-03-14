import { useNavigate } from 'react-router'
import { Button, ErrorMessage, FieldError, Form, Input, Label, TextField } from '@heroui/react'
import { GoCheck } from 'react-icons/go'
import * as authService from '../services/auth.service'
import { useState } from 'react'

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
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                <TextField
                    isRequired
                    name="email"
                    type='email'
                >
                    <Label>Email</Label>
                    <Input placeholder="Introduce tu email" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    name="username"
                    type='text'
                >
                    <Label>Nombre de usuario</Label>
                    <Input placeholder="Introduce tu nombre de usuario" />
                    <FieldError />
                </TextField>
                <TextField
                    name="name"
                    type='text'
                >
                    <Label>Nombre</Label>
                    <Input placeholder="Introduce tu nombre" />
                    <FieldError />
                </TextField>
                <TextField
                    name="surname"
                    type="text"
                >
                    <Label>Apellido</Label>
                    <Input placeholder="Introduce tu apellido" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    name="password"
                    type="password"
                >
                    <Label>Contraseña</Label>
                    <Input placeholder="Introduce tu contraseña" />
                    <FieldError />
                </TextField>
                <ErrorMessage>{errors.join('. ')}</ErrorMessage>
                <div className="flex gap-2">
                    <Button type="submit">
                        <GoCheck />
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
        </article>
    )
}

export default SignUpPage
