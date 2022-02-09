import {authApi, LoginParamsType} from "../../dal/authApi";
import {Dispatch} from "redux";
import {setAppError, setAppStatus, setIsInitialized} from "./appReducer";
import {handlerAppError} from "../../utilities/handlerAppError";
import {setProfile} from "./profileReducer";
import {AppActionsType} from "../store";

const initialState: InitialStateType = {
    isLoggedIn:false
}

export const LoginReducer = (state: InitialStateType = initialState, action: LoginMainType): InitialStateType => {
    switch (action.type) {
        case "AUTH/SET_IS_LOGGED_IN":
            return {...state, isLoggedIn: action.isLogged}
        default:
            return state
    }
}

export const setIsLoggedIn = (isLogged:boolean) => ({
    type: 'AUTH/SET_IS_LOGGED_IN',isLogged
}) as const


export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
    try{
        dispatch(setAppError(null))
        dispatch(setAppStatus('loading'));
        const res = await authApi.login(data)
        dispatch(setProfile(res.data))
        dispatch(setIsLoggedIn(true))
        dispatch(setAppStatus('succeeded'))
    }catch (error){
        handlerAppError(error, dispatch);
        dispatch(setAppStatus('failed'))
    }
}

export const logoutTC = () => async (dispatch:Dispatch<AppActionsType>)=>{
    try{
        dispatch(setIsLoggedIn(false))
        dispatch(setAppError(null))
        dispatch(setAppStatus('loading'));
        await authApi.logout()
        dispatch(setAppStatus('succeeded'))
    }catch(error){
        handlerAppError(error, dispatch);
        dispatch(setAppStatus('failed'))
    }
}

export const isAuth = () => async (dispatch: Dispatch<AppActionsType>) => {
    try {
        dispatch(setAppError(null))
        dispatch(setAppStatus('loading'));
        const res = await authApi.me()
        dispatch(setProfile(res.data))
        dispatch(setIsLoggedIn(true))
        dispatch(setAppStatus('succeeded'))
    }catch(error){
        // handlerAppError(error, dispatch)
        dispatch(setAppStatus('failed'))
    } finally {
        dispatch(setIsInitialized())
    }

}
type InitialStateType = {
    isLoggedIn:boolean
}
export type LoginMainType = SetIsLoggedInType
type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>