import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

function InvitePage() {
    const { token } = useParams()
    const navigate = useNavigate()

    console.log(token)

    useEffect(() => {
        navigate('/home/undefined', { replace: true })
    }, [])

    return (
        <h1>Pagina de invitacion</h1>
    )
}

export default InvitePage
