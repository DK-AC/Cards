import {Dispatch} from "redux";
import {authApi, RegisterType} from "../../dal/authApi";

const initialState = {
    isRegister: false
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
    authApi.register(data)
        .then(res => {
            dispatch(setIsRegisterAC(true))
        })
}

type InitialStateType = typeof initialState
export type RegisterActionType = ReturnType<typeof setIsRegisterAC>



