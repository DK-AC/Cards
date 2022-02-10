import {Dispatch} from "redux";
import {authApi, RegisterType} from "../../dal/authApi";

const initialState: InitialStateType = {
    isRegister: false,
    error: null,
    isLoading: 'idle'

}

export const RegisterReducer = (state: InitialStateType = initialState, action: RegisterActionType) => {
    switch (action.type) {
        case 'SET-IS-REGISTER':
            return {...state, isRegister: action.isRegister}
        case 'SET-REGISTER-ERROR':
            return {...state, error: action.error}
        case 'SET-IS-LOADING':
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}


export const setIsRegisterAC = (isRegister: boolean) => {
    return {type: 'SET-IS-REGISTER', isRegister} as const
}
export const setRegisterErrorAC = (error: null | string) => {
    return {type: 'SET-REGISTER-ERROR', error} as const
}
export const setIsLoadingAC = (isLoading: LoadingType) => {
    return {type: 'SET-IS-LOADING', isLoading} as const
}


export const registerTC = (data: RegisterType) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC('loading'))
    authApi.register(data)
        .then(res => {
            dispatch(setIsRegisterAC(true))
            dispatch(setIsLoadingAC('success'))
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + 'more details in the console')
            dispatch(setRegisterErrorAC(error))
        })
        .finally(() => {
            dispatch(setIsLoadingAC('false'))
        })
}

export type InitialStateType = {
    isRegister: boolean
    error: string | null
    isLoading: LoadingType
}

export type RegisterActionType =
    ReturnType<typeof setIsRegisterAC>
    | ReturnType<typeof setRegisterErrorAC>
    | ReturnType<typeof setIsLoadingAC>

export type LoadingType = 'loading' | 'false' | 'success' | 'idle'

