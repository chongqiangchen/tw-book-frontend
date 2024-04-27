import Axios from "axios";

export const request = Axios.create({
    timeout: 10000,
})

request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    }
)
