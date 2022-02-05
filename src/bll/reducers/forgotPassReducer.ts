import {Dispatch} from "redux"
import {authApi} from "../../dal/authApi"

export type passwordRecoveryInitialStateType = {
    isEmailSucceded: boolean
    email: string
    from: string
    message: string
}

const initialState: passwordRecoveryInitialStateType = {
    email: '',
    isEmailSucceded: false,
    from: "test-front-admin",
    message: `<div style="background-color: lime; padding: 15px"> password recovery link: <a href='http://localhost:3000/forgotpassword'> link</a></div>`
}

export const forgotPassReducer = (state: passwordRecoveryInitialStateType = initialState, action: ForgotActionType): passwordRecoveryInitialStateType => {
    switch (action) {
        default:
            return state
    }
}
export const isPasswordREcoweryAC = (isTrueEmail: boolean) => {
    return {type: 'SET-IS-THERE-EMAIL', isTrueEmail} as const
}

export const setEmailForPasswordTC = (email: string) => {
    return (dispatch: Dispatch) => {
        authApi.createNewPasswordVerification(email)
            .then(res => {
                console.log(res)
            })
    }
}

type InitialStateType = typeof initialState

export type ForgotActionType = ReturnType<typeof isPasswordREcoweryAC>



