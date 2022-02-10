import {Dispatch} from "redux";
import {authApi, RegisterType} from "../../dal/authApi";
import {setAppError, setAppStatus} from "./appReducer";

const initialState: InitialStateType = {
    isRegister: false,
}

export const RegisterReducer = (state: InitialStateType = initialState, action: RegisterActionType) => {
    switch (action.type) {
        case 'SET-IS-REGISTER':
            return {...state, isRegister: action.isRegister}
        default:
            return state
    }
}


export const setIsRegisterAC = (isRegister: boolean) => {
    return {type: 'SET-IS-REGISTER', isRegister} as const
}

export const registerTC = (data: RegisterType) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    authApi.register(data)
        .then(res => {
            dispatch(setIsRegisterAC(true))
            dispatch(setAppStatus('succeeded'))
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + 'more details in the console')
            dispatch(setAppError(error))
        })
        .finally(() => {
            dispatch(setAppStatus('failed'))
        })
}

export type InitialStateType = {
    isRegister: boolean
}

export type RegisterActionType =
    ReturnType<typeof setIsRegisterAC>


