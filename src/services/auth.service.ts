import { server } from './server'

async function signUp(user: unknown) {
    return server.post('/signUp', user)
}

async function logIn(user: unknown) {
    return server.post('/logIn', user)
}

async function verify(authToken: string) {
    return server.get('/verify', { headers: { Authorization: `Bearer ${authToken}` } })
}

export {
    signUp,
    logIn,
    verify
}
