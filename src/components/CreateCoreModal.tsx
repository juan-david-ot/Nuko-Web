import { Button, ErrorMessage, FieldError, FieldGroup, Fieldset, Form, Input, Label, Modal, Surface, TextField } from '@heroui/react'
import { BiAtom } from 'react-icons/bi'
import { GoCheck } from 'react-icons/go'
import coreService from '../services/core.service'
import { useState } from 'react'

type Props = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateCoreModal({ isOpen, setIsOpen }: Props) {
    const [errors, setErrors] = useState([])

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const data: Record<string, any> = {}
        formData.forEach((value, key) => {
            data[key] = value
        })

        coreService
            .createCore(data)
            .then(() => setIsOpen(false))
            .catch(error => setErrors(error.response.data.error))
    }
    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <div className='flex flex-col justify-center items-center'>
                <Modal.Backdrop variant='blur'>
                    <Modal.Container placement='center' size='xs'>
                        <Modal.Dialog className="sm:max-w-md">
                            {/* <Modal.CloseTrigger /> */}
                            <Modal.Header>
                                <Modal.Icon className="bg-accent text-accent-foreground">
                                    <BiAtom className="scale-125" />
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
                                                    className="w-full"
                                                    isRequired
                                                    name="name"
                                                    type="text"
                                                >
                                                    <Label>Nombre</Label>
                                                    <Input placeholder="Nombre de tu nuevo Núcleo" />
                                                    <FieldError>Este campo es obligatorio</FieldError>
                                                </TextField>
                                                <ErrorMessage>{errors.join('. ')}</ErrorMessage>
                                            </FieldGroup>
                                            <Fieldset.Actions className='flex-row-reverse justify-start'>
                                                <Button type="submit">
                                                    <GoCheck />
                                                    Submit
                                                </Button>
                                                <Button slot='close' variant="tertiary">
                                                    Cancel
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

export default CreateCoreModal
