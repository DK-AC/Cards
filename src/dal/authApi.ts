import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    // baseURL: 'http://localhost:7542/2.0',
    withCredentials: true,
})

const messageForEmail: string = `<div style="background-color: lime; padding: 15px"> password recovery link:
                         <a href='https://dk-ac.github.io/Cards/#/set-new-password/$token$'/>
                         link</a></div>`

export const authApi = {

    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<UserType>>('auth/login', data)
    },
    logout() {
        return instance.delete<ResponseType<{ info: string }>>('auth/me', {})
    },
    me() {
        return instance.post<ResponseType<UserType>>('auth/me', {})
    },
    register: (data: RegisterType) => {
        return instance.post<RegisterType, AxiosResponse<ResponseType<UserType>>>('auth/register', data)
    },
    forgotPassword(email: string, from?: string) {
        const dataForSendLink = {
            email,
            from: from,
            message: messageForEmail
        }
        return instance.post<PasswordRecoveryInitialStateType, AxiosResponse<ResponseType<{ info: string }>>>('auth/forgot', dataForSendLink)
    },
    recowerPassword(data: recowerPasswordType) {
        return instance.post<recowerPasswordType, AxiosResponse<ResponseType<{ info: string }>>>('auth/set-new-password', data)
    }
}

export type recowerPasswordType = {
    password: string,
    resetPasswordToken: string
}

export type PasswordRecoveryInitialStateType = {
    email: string,
    from?: string,
    message: string
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
export type ResponseType<T = {}> = {
    data: T
    error?: string
}

export type UserType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод

    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
}
