import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true,
})


export const authApi = {
    register: (data: RegisterType) => {
        return instance.post('auth/register', data)
    },
    emailVerification: (email: string) => {
        // return instance.
    }
}

export type RegisterType = {
    email: string
    password: string
}
