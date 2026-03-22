import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import coreService from '../services/core.service'

function InvitePage() {
    const { token } = useParams()
    const navigate = useNavigate()

    console.log(token)

    function createInvitation() {
        coreService
            .acceptInvitationToCore(String(token))
            .then(({ data }) => navigate(`/home/${data.coreData.id}`, { replace: true }))
            .catch(() => navigate('/home/undefined'))
    }

    useEffect(() => {
        if (!token) return
        createInvitation()
        // navigate('/home/undefined', { replace: true })
    }, [])

    return (
        <h1>Pagina de invitacion</h1>
    )
}

export default InvitePage
