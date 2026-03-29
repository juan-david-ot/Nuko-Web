import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useCore } from '../../contexts/core/useCore'
import coreService from '../../services/core.service'
import Loading from '../../components/Loading'

function InvitePage() {
    const { token } = useParams()
    const navigate = useNavigate()

    const { refreshCores } = useCore()

    console.log(token)

    function acceptInvitation() {
        coreService
            .acceptInvitationToCore(String(token))
            .then(() => {
                refreshCores()
                    .finally(() => navigate('/home', { replace: true }))
            })
            .catch(() => navigate('/home', { replace: true }))
    }

    useEffect(() => {
        if (!token) return
        acceptInvitation()
    }, [])

    return (
        <Loading />
    )
}

export default InvitePage
