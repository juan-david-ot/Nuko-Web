import type { Core } from '../definitions/types'
import { server } from './server'

async function createCore(core: Core) {
    return server.post('/cores', core)
}

export default {
    createCore
}
