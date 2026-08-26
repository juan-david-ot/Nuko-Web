import type { Core } from '../definitions/types.ts'
import { axios } from './axios.ts'

async function getUserCores() {
    return axios.get('/cores')
}

async function getUserCoreById(coreId: string) {
    return axios.get(`/cores/${coreId}`)
}

async function getUserCoreInformationById(coreId: string) {
    return axios.get(`/cores/${coreId}/information`)
}

async function createCore(core: Core) {
    return axios.post('/cores', core)
}

async function createInvitationToCore(coreId: string) {
    return axios.post(`/cores/${coreId}/invitation`)
}

async function decodeInvitationToCore(token: string) {
    return axios.get(`/cores/invitation/${token}`)
}

async function acceptInvitationToCore(token: string) {
    return axios.post(`/cores/invitation/${token}`)
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
