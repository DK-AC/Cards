import {Dispatch} from "redux"
import {passwordApi} from "../../dal/passwordApi";

export type passwordRecoveryInitialStateType = {
    isLoading: boolean
    errorMessage: string
    isRequestSucceeded: boolean
    email: string
    from: string
    message: string
}

const initialState: PasswordRecoveryInitialStateType = {
    isLoading: false,
    errorMessage: '',
    isRequestSucceeded: false,
    email: '',
    from: "test-front-admin",
    message: `<div style="background-color: lime; padding: 15px"> password recovery link: <a href='http://localhost:3000/friday-project#/add-new-password/$token$'> link</a></div>`
}

export const passwordRecoveryReducer = (state: passwordRecoveryInitialStateType = initialState, action: PasswordReducerActionTypes): passwordRecoveryInitialStateType => {
    switch (action.type) {
        case "password-recovery/PASSWORD-IS-CHANGED":
            return {...state, email: action.email}
        case "password-recovery/SET-IS-EMAIL-SUCCEEDED":
            return {...state, isRequestSucceeded: action.isRequestSucceeded}
        case "password-recovery/SET-ERROR-MESSAGE":
            return {...state, errorMessage: action.errorMessage}
        default:
            return state
    }
}
export const isPasswordRecoverySucceededAC = (isRequestSucceeded: boolean) => {
    return {type: "password-recovery/SET-IS-EMAIL-SUCCEEDED", isRequestSucceeded} as const
}

export const setPasswordRecoveryAC = (email: string) => {
    return {type: "password-recovery/PASSWORD-IS-CHANGED", email} as const
}
export const setErrorMessageAC = (errorMessage: string) => {
    return {type: "password-recovery/SET-ERROR-MESSAGE", errorMessage} as const
}

export const setEmailForPasswordTC = (data: PasswordRecoveryInitialStateType) => {
    return (dispatch: Dispatch) => {
        passwordApi.createNewPassword(data)
            .then(res => {
                dispatch(isPasswordRecoverySucceededAC(true))
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : `${e.message} more details in the console`
                dispatch(setErrorMessageAC(error))
            })
    }
}

export type PasswordReducerActionTypes =
    ReturnType<typeof isPasswordRecoverySucceededAC> |
    ReturnType<typeof setPasswordRecoveryAC> |
    ReturnType<typeof setErrorMessageAC>

export type PasswordRecoveryInitialStateType = {
    isLoading: boolean
    errorMessage: string
    isRequestSucceeded: boolean
    email: string
    from: string
    message: string
}



