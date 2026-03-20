import type { Core } from '../definitions/types'
import { server } from './server'

async function getMyCores() {
    return server.get('/cores')
}

async function createCore(core: Core) {
    return server.post('/cores', core)
}

export default {
    getMyCores,
    createCore
}
