import axios from '@/fetch'

export function getIssue(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}