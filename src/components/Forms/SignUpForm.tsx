import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Description, ErrorMessage, FieldError, FieldGroup, Fieldset, Form, Input, InputGroup, Label, Spinner, Surface, TextField } from '@heroui/react'
import { GoCheck } from 'react-icons/go'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import authService from '../../services/auth.service'

function SignUpForm() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [errors, setErrors] = useState()

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const data: Record<string, string> = {}
        formData.forEach((value, key) => {
            data[key] = value.toString()
        })

        authService
            .signUp(data)
            .then(() => navigate('/auth/iniciar-sesion'))
            .catch(error => setErrors(error.response.data.error))
            .finally(() => setIsLoading(false))
    }

    return (
        <Surface className='w-full min-w-72'>
            <Form className='flex flex-col gap-4' onSubmit={onSubmit}>
                <Fieldset>
                    <Fieldset.Legend>¡Regístrate!</Fieldset.Legend>
                    <Description>Ha-Nuko Matata. Convive y deja vivir.</Description>
                    <FieldGroup>
                        <TextField
                            variant='secondary'
                            isRequired
                            name='email'
                            type='text'
                        >
                            <Label>Email</Label>
                            <Input placeholder='Introduce tu email' />
                            <FieldError>Este campo es obligatorio</FieldError>
                        </TextField>
                        <TextField
                            variant='secondary'
                            isRequired
                            name="username"
                            type='text'
                        >
                            <Label>Nombre de usuario</Label>
                            <Input placeholder="Introduce tu nombre de usuario" />
                            <FieldError>Este campo es obligatorio</FieldError>
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
                            type={isVisible ? 'text' : 'password'}
                        >
                            <Label>Contraseña</Label>
                            <InputGroup>
                                <InputGroup.Input placeholder="Introduce tu contraseña" />
                                <InputGroup.Suffix className="pr-0">
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setIsVisible(!isVisible)}
                                    >
                                        {isVisible ? <AiOutlineEye className="size-6" /> : <AiOutlineEyeInvisible className="size-6" />}
                                    </Button>
                                </InputGroup.Suffix>
                            </InputGroup>
                            <FieldError>Este campo es obligatorio</FieldError>
                        </TextField>
                        <ErrorMessage>{errors && errors}</ErrorMessage>
                    </FieldGroup>
                    <Fieldset.Actions>
                        <Button type="submit">
                            {
                                isLoading
                                    ?
                                    <Spinner color='current' size='lg' />
                                    :
                                    <>
                                        <GoCheck />
                                        Registarse
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

export default SignUpForm
