import { axios } from './axios'

async function getTaskListsByCoreId(coreId: string) {
    return axios.get(`/task-lists/cores/${coreId}`)
}

export default {
    getTaskListsByCoreId
}
