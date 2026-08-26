import { create } from 'axios'

const axios = create({
    baseURL: `${import.meta.env.REACT_APP_API_URL}`
})

axios.interceptors.request.use((config) => {
    const authToken = localStorage.getItem('authToken')

    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`
    }

    return config
})

export {
    axios
}
