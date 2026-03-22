import type { Core } from '../definitions/types'
import { server } from './server'

async function getMyCores() {
    return server.get('/cores')
}

async function createCore(core: Core) {
    return server.post('/cores', core)
}

async function createInvitationToCore(coreId: string) {
    return server.post(`/cores/${coreId}/invitation`)
}

async function acceptInvitationToCore(token: string) {
    return server.post(`/cores/invitation/${token}`)
}

export default {
    getMyCores,
    createCore,
    createInvitationToCore,
    acceptInvitationToCore
}
