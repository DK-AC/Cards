import {Dispatch} from "redux";
import {authApi, RegisterType} from "../../dal/authApi";
import {setAppError} from "./appReducer";

const initialState: InitialStateType = {
    isRegister: false,
    isLoading: 'idle'

}

export const RegisterReducer = (state: InitialStateType = initialState, action: RegisterActionType) => {
    switch (action.type) {
        case 'SET-IS-REGISTER':
            return {...state, isRegister: action.isRegister}
        case 'SET-IS-LOADING':
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}


export const setIsRegisterAC = (isRegister: boolean) => {
    return {type: 'SET-IS-REGISTER', isRegister} as const
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
            dispatch(setAppError(error))
        })
        .finally(() => {
            dispatch(setIsLoadingAC('false'))
        })
}

export type InitialStateType = {
    isRegister: boolean
    isLoading: LoadingType
}

export type RegisterActionType =
    ReturnType<typeof setIsRegisterAC>
    | ReturnType<typeof setIsLoadingAC>


export type LoadingType = 'loading' | 'false' | 'success' | 'idle'

