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

export const setEmailForPasswordTC = (data: PasswordRecoveryInitialStateType) => {
    return (dispatch: Dispatch) => {
        passwordApi.createNewPassword(data)
            .then(res => {
                dispatch(isPasswordRecoverySucceededAC(true))
            })
    }
}

export type PasswordReducerActionTypes =
    ReturnType<typeof isPasswordRecoverySucceededAC> |
    ReturnType<typeof setPasswordRecoveryAC>

export type PasswordRecoveryInitialStateType = {
    isLoading: boolean
    errorMessage: string
    isRequestSucceeded: boolean
    email: string
    from: string
    message: string
}



