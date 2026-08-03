import type { Core } from '../definitions/types.ts'
import { server } from './server.ts'

async function getUserCores() {
    return server.get('/cores')
}

async function getUserCoreById(coreId: string) {
    return server.get(`/cores/${coreId}`)
}

async function getUserCoreInformationById(coreId: string) {
    return server.get(`/cores/${coreId}/information`)
}

async function createCore(core: Core) {
    return server.post('/cores', core)
}

async function createInvitationToCore(coreId: string) {
    return server.post(`/cores/${coreId}/invitation`)
}

async function decodeInvitationToCore(token: string) {
    return server.get(`/cores/invitation/${token}`)
}

async function acceptInvitationToCore(token: string) {
    return server.post(`/cores/invitation/${token}`)
}

export default {
    getUserCores,
    getUserCoreById,
    getUserCoreInformationById,
    createCore,
    createInvitationToCore,
    decodeInvitationToCore,
    acceptInvitationToCore
}
