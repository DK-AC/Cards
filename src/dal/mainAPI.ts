import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    // baseURL: 'http://localhost:7542/',
    withCredentials: true,
})


const messageForEmail: string = `<div style="background-color: lime; padding: 15px"> password recovery link: 
                         <a href='http://localhost:3000/cards_project/set-new-password/$token$' /> 
                         link</a></div>`

export const authApi = {

    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<UserType>>>('/auth/login', data)
    },
    logout() {
        return instance.delete<ResponseType<{ info: string }>>('/auth/me', {})
    },
    me() {
        return instance.post<ResponseType<UserType>>('/auth/me', {})
    },
    register: (data: RegisterType) => {
        return instance.post<RegisterType, AxiosResponse<ResponseType<UserType>>>('auth/register', data)
    },
    forgotPassword(email: string) {
        const dataForSendLink = {
            email,
            from: 'email from us',
            message: messageForEmail
        }
        return instance.post<PasswordRecoveryInitialStateType, AxiosResponse<ResponseType<{ info: string }>>>('auth/forgot', dataForSendLink)
    },
    recowerPassword(data: recowerPasswordType) {
        return instance.post<recowerPasswordType, AxiosResponse<ResponseType<{ info: string }>>>('/auth/set-new-password', data)
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

export type ResponseType<T = {}> = {
    data: T
    error?: string
}

export type UserType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // ???????????????????? ??????????

    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean; // ???????????????????? ???? ??????????
    rememberMe: boolean;
}