import axios from 'axios'
import {PasswordRecoveryInitialStateType} from "../bll/reducers/passwordRecoveryReducer";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/'
})

export const passwordApi = {
    createNewPassword(data: PasswordRecoveryInitialStateType) {
        return instance.post<RequestResponseType>('auth/forgot', data)
    }
}

export type RequestResponseType = {
    info: string
    error: string
}