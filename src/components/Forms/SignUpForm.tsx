import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Description, ErrorMessage, FieldError, FieldGroup, Fieldset, Form, Input, Label, Surface, TextField } from '@heroui/react'
import { GoCheck } from 'react-icons/go'
import * as authService from '../../services/auth.service'

function SignUpForm() {
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
        <Surface className="w-full min-w-72">
            <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
                            type="password"
                        >
                            <Label>Contraseña</Label>
                            <Input placeholder="Introduce tu contraseña" />
                            <FieldError>Este campo es obligatorio</FieldError>
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
        // </div>
    )
}

export default SignUpForm
