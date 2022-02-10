import {Dispatch} from "redux";
import {authApi} from "../../dal/authApi";



export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const SET_ERROR = 'appReducer/SET_ERROR'
const SET_STATUS = 'appReducer/SET_STATUS'
const SET_IS_INITIALIZED ='appReducer/SET_IS_INITIALIZED'

const initialState = {
    error: null as string | null,
    status: "failed" as RequestStatusType,
    isInitialized: false
}
type initialStateType = typeof initialState

export const AppReducer = (state = initialState, action: AppMainType): initialStateType => {
    switch (action.type) {
        case SET_ERROR:
            return {...state, error: action.error}
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_IS_INITIALIZED:
            return {...state,isInitialized:true}
        default:
            return state
    }
}

export const setAppErrorAC = (error: null | string) => ({type: SET_ERROR, error}) as const
export const setAppStatusAC = (status: RequestStatusType) => ({type: SET_STATUS, status}) as const
export const setIsInitializedAC = ()=> ({type :SET_IS_INITIALIZED}) as const


export const isAuthTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC('loading'));
        const res= await authApi.me()
        /* dispatch(setProfile(res.data))*/
        /*dispatch(setIsLoggedInAC(true))*/
    }catch(error){
        //handlerAppError(error, dispatch)
    } finally {
        dispatch(setIsInitializedAC())
        dispatch(setAppStatusAC('idle'))
    }

}


export type AppMainType = SetAppErrorType
  | SetAppStatusType
  | SetIsInitialized

type SetAppErrorType = ReturnType<typeof setAppErrorAC>
type SetAppStatusType = ReturnType<typeof setAppStatusAC>
type SetIsInitialized = ReturnType<typeof setIsInitializedAC>
