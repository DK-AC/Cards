import {Dispatch} from "redux";
import {authApi} from "../../dal/authApi";
import {handlerAppError} from "../../utilities/handlerAppError";
import {setIsLoggedInAC} from "./loginReducer";
import {setProfile} from "./profileReducer";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const SET_ERROR = 'appReducer/SET_ERROR'
const SET_STATUS = 'appReducer/SET_STATUS'
const SET_IS_INITIALIZED = 'appReducer/SET_IS_INITIALIZED'
const SET_COOKIES = 'appReducer/cookiesStatus'

const initialState = {
    error: null as string | null,
    status: "failed" as RequestStatusType,
    isInitialized: false,
    cookiesAreAlive: true
}
type initialStateType = typeof initialState

export const AppReducer = (state = initialState, action: AppMainType): initialStateType => {
    switch (action.type) {
        case SET_ERROR:
            return {...state, error: action.error}
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        case SET_COOKIES: {
            return {...state, cookiesAreAlive: true}
        }
        default:
            return state
    }
}

export const setAppErrorAC = (error: null | string) => ({type: SET_ERROR, error}) as const
export const setAppStatusAC = (status: RequestStatusType) => ({type: SET_STATUS, status}) as const
export const setIsInitializedAC = (isInitialized: boolean) => ({type: SET_IS_INITIALIZED, isInitialized}) as const
export const setCookiesAC = (cookiesAreAlive: boolean) => ({type: SET_COOKIES, cookiesAreAlive}) as const


export const isAuthTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC('loading'));
        const res = await authApi.me()
        dispatch(setCookiesAC(true))
        dispatch(setIsLoggedInAC(true))
        dispatch(setProfile(res.data))
    } catch (error) {
        handlerAppError(error, dispatch)
        dispatch(setCookiesAC(false))
    } finally {
        dispatch(setIsInitializedAC(true))
        dispatch(setAppStatusAC('idle'))
    }
}


export type AppMainType = SetAppErrorType
    | SetAppStatusType
    | SetIsInitializedType | setCookiesType

type SetAppErrorType = ReturnType<typeof setAppErrorAC>
type SetAppStatusType = ReturnType<typeof setAppStatusAC>
type SetIsInitializedType = ReturnType<typeof setIsInitializedAC>
type setCookiesType = ReturnType<typeof setCookiesAC>
