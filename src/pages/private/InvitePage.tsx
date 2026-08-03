import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button, Fieldset, Modal, Surface } from '@heroui/react'
import { BiAtom } from 'react-icons/bi'
import type { Core, User } from '../../definitions/types.ts'
import { useCore } from '../../contexts/core/useCore.ts'
import coreService from '../../services/core.service.ts'
import Loading from '../../components/Loading.tsx'

function InvitePage() {
    const { token } = useParams()
    const navigate = useNavigate()

    const { refreshCores } = useCore()

    const [isOpen, setIsOpen] = useState(false)
    const [hostUser, setHostUser] = useState<User>()
    const [core, setCore] = useState<Core>()

    console.log(token)

    function decodeInvitation() {
        coreService
            .decodeInvitationToCore(String(token))
            .then(({ data }) => {
                setHostUser(data.hostUser)
                setCore(data.core)
            })
            .catch(() => navigate('/home', { replace: true }))
    }

    function acceptInvitation() {
        setIsOpen(false)
        coreService
            .acceptInvitationToCore(String(token))
            .then(() => {
                refreshCores()
                    .finally(() => navigate(`/home/${core?.id}`, { replace: true }))
            })
            .catch(() => navigate('/home', { replace: true }))
    }

    function declineInvitation() {
        setIsOpen(false)
        navigate('/home', { replace: true })
    }

    useEffect(() => {
        if (!token) return
        decodeInvitation()
        setIsOpen(true)
    }, [])

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <Modal.Backdrop variant='blur' isDismissable={false}>
                    <Modal.Container placement='center' size='xs'>
                        <Modal.Dialog className="sm:max-w-md">
                            <Modal.Header>
                                <Modal.Icon className="bg-accent text-accent-foreground">
                                    <BiAtom className="scale-125" />
                                </Modal.Icon>
                                <Modal.Heading>¡{hostUser?.username} te ha invitado al Núcleo: {core?.name}!</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body className="p-6">
                                <p>
                                    Has recibido una invitación para unirte a este Núcleo.
                                    Puedes aceptarla pulsando en &quot;Aceptar&quot;.
                                    Si aceptas, pasarás a formar parte de él y podrás acceder a su contenido y participar con los demás miembros.
                                    Si no deseas unirte en este momento, puedes declinar la invitación pulsando en &quot;Cancelar&quot;.
                                </p>
                                <Surface variant="default" className='pt-6'>
                                    <Fieldset>
                                        <Fieldset.Actions className='flex-row justify-end'>
                                            <Button
                                                onClick={acceptInvitation}
                                            >
                                                Aceptar
                                            </Button>
                                            <Button
                                                onClick={declineInvitation}
                                                variant="tertiary"
                                            >
                                                Rechazar
                                            </Button>
                                        </Fieldset.Actions>
                                    </Fieldset>
                                </Surface>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
            <Loading />
        </>
    )
}

export default InvitePage
