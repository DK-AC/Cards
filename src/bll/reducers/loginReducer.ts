import {authApi, LoginParamsType, recowerPasswordType, RegisterType} from "../../dal/authApi";
import {Dispatch} from "redux";
import {handlerAppError} from "../../utilities/handlerAppError";
import {AppMainType, setAppErrorAC, setAppStatusAC} from "./appReducer";

const SET_IS_LOGGED = 'loginReducer/SET_IS_LOGGED_IN'
const SET_EMAIL_FOR_PASSWORD_RECOVERY = 'loginReducer/PASSWORD-IS-CHANGED'
const SET_NEW_PASSWORD = 'loginReducer/SET-IS-EMAIL-SUCCEEDED'
const SET_IS_REGISTRATED = 'loginReducer/SET_IS_REGISTRATED'


const initialState = {
    isLogged: false,
    isRegister: false,
    email: '',
    isRequestSucceeded: false,
    passwordСhanged: false
};

type initialStateType = typeof initialState

export const LoginReducer = (state = initialState, action: LoginMainType): initialStateType => {
    switch (action.type) {
        case SET_IS_LOGGED:
            return {...state, isLogged: action.isLogged}
        case SET_EMAIL_FOR_PASSWORD_RECOVERY :
            return {...state, email: action.email}
        case SET_NEW_PASSWORD:
            return {...state, isRequestSucceeded: action.isRequestSucceeded}
        case SET_IS_REGISTRATED:
            return {...state, isRegister: action.isRegister}
        default:
            return state
    }
}

//Action Creators
export const setIsLoggedInAC = (isLogged: boolean) => ({type: SET_IS_LOGGED, isLogged}) as const
export const setEmailForPasswordAC = (email: string) => ({type: SET_EMAIL_FOR_PASSWORD_RECOVERY, email}) as const
export const isPasswordRecoverySucceededAC = (isRequestSucceeded: boolean) => ({
    type: SET_NEW_PASSWORD,
    isRequestSucceeded
}) as const
export const setIsRegisterAC = (isRegister: boolean) => ({type: SET_IS_REGISTRATED, isRegister}) as const


//thunks
export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC('loading'));
        await authApi.login(data)
        dispatch(setIsLoggedInAC(true))
    } catch (error) {
        handlerAppError(error, dispatch);
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}
export const logoutTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC('loading'));
        await authApi.logout()
        dispatch(setIsLoggedInAC(false))
    } catch (error) {
        handlerAppError(error, dispatch);
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}
export const setEmailForPasswordTC = (email: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC('loading'));
        await authApi.forgotPassword(email)
        dispatch(isPasswordRecoverySucceededAC(true))
        dispatch(setEmailForPasswordAC(email))
    } catch (error) {
        handlerAppError(error, dispatch);
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}
export const setNewPasswordTC = (data: recowerPasswordType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC('loading'));
        await authApi.recowerPassword(data)
        dispatch(isPasswordRecoverySucceededAC(true))
    } catch (error) {
        handlerAppError(error, dispatch);
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const registerTC = (data: RegisterType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await authApi.register(data)
        dispatch(setIsRegisterAC(true))
    } catch (error) {
        handlerAppError(error, dispatch);
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}


export type LoginMainType = ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setEmailForPasswordAC>
    | ReturnType<typeof isPasswordRecoverySucceededAC>
    | ReturnType<typeof setIsRegisterAC> | AppMainType

