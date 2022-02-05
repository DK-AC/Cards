import { Dispatch } from "redux"
import { authApi } from "../../dal/authApi"

type initialStateType = {
    isEmailThere: boolean
}

const initialState : initialStateType = {
    isEmailThere: false
}

export const forgotPassReducer = (state = initialState, action: any) => {
    switch (action) {
        default:
            return state
    }
}
export const setCurrentEmailAC = (isTrueEmail: boolean) => {
    return {type: 'SET-IS-THERE-EMAIL', isTrueEmail} as const
}

export const setCurrentTC = (email: string) => {
    return (dispatch: Dispatch) => {
        authApi.emailVerification(email)
            // .then()
    }
}

type InitialStateType = typeof initialState
export type RegisterActionType = ReturnType<typeof setCurrentEmailAC>



