import type { User } from '../definitions/types.ts'
import { axios } from './axios.ts'

async function signUp(user: User) {
    return axios.post('/auth/sign-up', user)
}

async function logIn(user: User) {
    return axios.post('/auth/log-in', user)
}

async function forgotPassword(email: string) {
    return axios.post('/auth/forgot-password', { email })
}

async function resetPassword(token: string, newPassword: string, confirmNewPassword: string) {
    return axios.post('/auth/reset-password', { token, newPassword, confirmNewPassword })
}

async function changePassword(password: string, newPassword: string, confirmNewPassword: string) {
    return axios.post('/auth/change-password', { password, newPassword, confirmNewPassword })
}

async function verify() {
    return axios.get('/auth/verify')
}

export default {
    signUp,
    logIn,
    forgotPassword,
    resetPassword,
    changePassword,
    verify
}
