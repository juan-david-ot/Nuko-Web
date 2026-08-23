import type { User } from '../definitions/types.ts'
import { server } from './server.ts'

async function signUp(user: User) {
    return server.post('/auth/signUp', user)
}

async function logIn(user: User) {
    return server.post('/auth/logIn', user)
}

async function forgotPassword(email: string) {
    return server.post('/auth/forgotPassword', { email })
}

async function resetPassword(token: string, newPassword: string, confirmNewPassword: string) {
    return server.post('/auth/resetPassword', { token, newPassword, confirmNewPassword })
}

async function changePassword(password: string, newPassword: string, confirmNewPassword: string) {
    return server.post('/auth/changePassword', { password, newPassword, confirmNewPassword })
}

async function verify() {
    return server.get('/auth/verify')
}

export default {
    signUp,
    logIn,
    forgotPassword,
    resetPassword,
    changePassword,
    verify
}
