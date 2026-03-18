import axios from 'axios'

const server = axios.create({
    baseURL: `${import.meta.env.REACT_APP_API_URL}/auth`
})

server.interceptors.request.use((config) => {
    const authToken = localStorage.getItem('authToken')

    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`
    }

    return config
})

export {
    server
}
