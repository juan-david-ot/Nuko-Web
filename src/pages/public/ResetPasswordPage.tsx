import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button, Description, ErrorMessage, FieldError, FieldGroup, Fieldset, Form, InputGroup, Label, Spinner, Surface, TextField } from '@heroui/react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { GoCheck } from 'react-icons/go'
import authService from '../../services/auth.service'

function ResetPasswordPage() {
    const { token } = useParams()
    const navigate = useNavigate()

    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
    const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] = useState(false)
    const [error, setError] = useState()

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsLoading(true)

        authService
            .resetPassword(String(token), newPassword, confirmNewPassword)
            .then(() => {
                setNewPassword('')
                setConfirmNewPassword('')
                navigate('/auth/iniciar-sesion')
            })
            .catch((error) => setError(error.response.data.error))
            .finally(() => setIsLoading(false))
    }

    return (
        <article className='h-full flex justify-center items-start pt-10 lg:items-start lg:pt-40'>
            <div className="flex flex-col items-center justify-center rounded-4xl bg-surface p-3">
                <Surface className='w-full pt-4 min-w-72'>
                    <Form className='flex flex-col gap-4' onSubmit={onSubmit}>
                        <Fieldset>
                            <Fieldset.Legend>Recupera tu cuenta</Fieldset.Legend>
                            <Description>Introduce tu nueva contraseña y luego inicia sesion</Description>
                            <FieldGroup>
                                <TextField
                                    className='w-full'
                                    variant='secondary'
                                    isRequired
                                    name='newPassword'
                                    type={isNewPasswordVisible ? 'text' : 'password'}
                                >
                                    <Label>Nueva Contraseña</Label>
                                    <InputGroup>
                                        <InputGroup.Input
                                            placeholder='Introduce tu nueva contraseña'
                                            value={newPassword}
                                            onChange={(event) => setNewPassword(event.target.value)}
                                        />
                                        <InputGroup.Suffix className='pr-0'>
                                            <Button
                                                isIconOnly
                                                size='sm'
                                                variant='ghost'
                                                onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                                            >
                                                {isNewPasswordVisible ? <AiOutlineEye className='size-6' /> : <AiOutlineEyeInvisible className='size-6' />}
                                            </Button>
                                        </InputGroup.Suffix>
                                    </InputGroup>
                                    <FieldError>Este campo es obligatorio</FieldError>
                                </TextField>
                                <TextField
                                    className='w-full'
                                    variant='secondary'
                                    isRequired
                                    name='confirmNewPassword'
                                    type={isConfirmNewPasswordVisible ? 'text' : 'password'}
                                >
                                    <Label>Confirmar Contraseña</Label>
                                    <InputGroup>
                                        <InputGroup.Input
                                            placeholder='Confirma tu nueva contraseña'
                                            value={confirmNewPassword}
                                            onChange={(event) => setConfirmNewPassword(event.target.value)}
                                        />
                                        <InputGroup.Suffix className='pr-0'>
                                            <Button
                                                isIconOnly
                                                size='sm'
                                                variant='ghost'
                                                onClick={() => setIsConfirmNewPasswordVisible(!isConfirmNewPasswordVisible)}
                                            >
                                                {isConfirmNewPasswordVisible ? <AiOutlineEye className='size-6' /> : <AiOutlineEyeInvisible className='size-6' />}
                                            </Button>
                                        </InputGroup.Suffix>
                                    </InputGroup>
                                    <FieldError>Este campo es obligatorio</FieldError>
                                </TextField>
                                <ErrorMessage>{error && error}</ErrorMessage>
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

export default ResetPasswordPage
