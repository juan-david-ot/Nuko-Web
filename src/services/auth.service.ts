import type { User } from '../definitions/types.ts'
import { server } from './server.ts'

async function signUp(user: User) {
    return server.post('/auth/signUp', user)
}

async function logIn(user: User) {
    return server.post('/auth/logIn', user)
}

async function verify(authToken: string) {
    return server.get('/auth/verify', { headers: { Authorization: `Bearer ${authToken}` } })
}

export default {
    signUp,
    logIn,
    verify
}
