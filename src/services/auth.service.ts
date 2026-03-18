import type { User } from '../definitions/types'
import { server } from './server'

async function signUp(user: User) {
    return server.post('/signUp', user)
}

async function logIn(user: User) {
    return server.post('/logIn', user)
}

async function verify(authToken: string) {
    return server.get('/verify', { headers: { Authorization: `Bearer ${authToken}` } })
}

export default {
    signUp,
    logIn,
    verify
}
