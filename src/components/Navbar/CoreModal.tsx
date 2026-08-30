import { useState } from 'react'
import { Button, FieldError, FieldGroup, Fieldset, Form, Input, Label, Modal, Spinner, Surface, TextField } from '@heroui/react'
import { GoCheck } from 'react-icons/go'
import { IoLogoReact } from 'react-icons/io5'
import { useCore } from '../../contexts/core/useCore.ts'
import coreService from '../../services/core.service.ts'

type Props = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    getCores: () => Promise<void>
}

function CoreModal({ isOpen, setIsOpen, getCores }: Props) {
    const { setCore } = useCore()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState([])

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const data: Record<string, any> = {}
        formData.forEach((value, key) => {
            data[key] = value
        })

        coreService
            .createCore(data)
            .then(({ data }) => {
                getCores()
                    .then(() => {
                        setIsOpen(false)
                        setCore(new Set([data.newCore.id]))
                    })
            })
            .catch(error => setError(error.response.data.error))
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <div className='flex flex-col justify-center items-center'>
                <Modal.Backdrop variant='blur'>
                    <Modal.Container placement='center' size='xs'>
                        <Modal.Dialog className="sm:max-w-md">
                            <Modal.Header>
                                <Modal.Icon className="bg-accent text-accent-foreground">
                                    <IoLogoReact className="scale-140" />
                                </Modal.Icon>
                                <Modal.Heading>¡Crea un Nuevo Núcleo!</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body className="p-6">
                                <Surface variant="default">
                                    <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                                        <Fieldset>
                                            <FieldGroup>
                                                <TextField
                                                    variant='secondary'
                                                    fullWidth
                                                    isRequired
                                                    name="name"
                                                    type="text"
                                                >
                                                    <Label>Nombre</Label>
                                                    <Input placeholder="Nombre del nuevo Núcleo" />
                                                    <FieldError>Este campo es obligatorio</FieldError>
                                                </TextField>
                                                <FieldError>{error && error}</FieldError>
                                            </FieldGroup>
                                            <Fieldset.Actions className='flex-row justify-end'>
                                                <Button type="submit">
                                                    {
                                                        isLoading
                                                            ?
                                                            <Spinner color='current' size='lg' />
                                                            :
                                                            <>
                                                                <GoCheck />
                                                                Crear
                                                            </>
                                                    }
                                                </Button>
                                                <Button slot='close' variant="tertiary">
                                                    Cancelar
                                                </Button>
                                            </Fieldset.Actions>
                                        </Fieldset>
                                    </Form>
                                </Surface>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </div>
        </Modal>
    )
}

export default CoreModal
