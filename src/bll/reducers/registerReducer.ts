import {Dispatch} from "redux";
import {authApi, RegisterType} from "../../dal/authApi";

const initialState: InitialStateType = {
    isRegister: false,
    error: null
}

export const registerReducer = (state: InitialStateType = initialState, action: RegisterActionType) => {
    switch (action.type) {
        case 'SET-IS-REGISTER':
            return {...state, isRegister: action.isRegister}
        case "SET-REGISTER-ERROR":
            return {...state, error: action.error}
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


export const registerTC = (data: RegisterType) => (dispatch: Dispatch) => {
    authApi.register(data)
        .then(res => {
            dispatch(setIsRegisterAC(true))
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + 'more details in the console')
            dispatch(setRegisterErrorAC(error))
        })
}

export type InitialStateType = {
    isRegister: boolean
    error: string | null
}

export type RegisterActionType =
    ReturnType<typeof setIsRegisterAC>
    | ReturnType<typeof setRegisterErrorAC>



