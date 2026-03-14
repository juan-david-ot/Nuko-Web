import { useNavigate } from 'react-router'
import { Button, FieldError, Form, Input, Label, TextField } from '@heroui/react'
import { GoCheck } from 'react-icons/go'
import * as authService from '../services/auth.service'
import { useAuth } from '../contexts/auth/useAuth'

function LogInPage() {
    const { authUser } = useAuth()
    const navigate = useNavigate()

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
            .catch(error => console.error(error))
    }
    return (
        <article className='h-full flex justify-center items-center lg:items-start lg:pt-40'>
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                <TextField
                    isRequired
                    name="identifier"
                    type='text'
                >
                    <Label>Email/Nombre de usuario</Label>
                    <Input placeholder="Introduce tu email o nombre de usuario" />
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

export default LogInPage
