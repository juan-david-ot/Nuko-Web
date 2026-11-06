import { axios } from './axios'

async function getTaskListsByCoreId(coreId: string) {
    return axios.get(`/taskLists/cores/${coreId}`)
}

export default {
    getTaskListsByCoreId
}
