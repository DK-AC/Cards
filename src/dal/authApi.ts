import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    // baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true,
})

export const authApi = {
    login(data: LoginParamsType) {
        return instance.post('/auth/login', data)
    },
    logout() {
        return instance.delete('/auth/me', {})
    },
    me() {
        return instance.post('/auth/me', {})
    },
    register: (data: RegisterType) => {
        return instance.post<boolean, AxiosResponse>('auth/register', data)
    },
    createNewPasswordVerification: (data: string) => {
        return instance.post<RequestResponeType>('auth/forgot', data)
    }
}

export type RegisterType = {
    email: string
    password: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}


export type RequestResponeType = {
    info: string
    error: string
}