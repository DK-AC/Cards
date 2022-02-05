import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true,
})


export const authApi = {
    register: (data: RegisterType) => {
        return instance.post('auth/register', data)
    },
    createNewPasswordVerification: (data: string) => {
        return instance.post<RequestResponeType>('auth/forgot', data)
    }
}

export type RegisterType = {
    email: string
    password: string
}

export type RequestResponeType = {
    info: string
    error: string
}
