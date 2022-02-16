import {AppMainType, isAuthTC, setAppErrorAC, setAppStatusAC, setIsInitializedAC} from "./appReducer";
import {cardsApi, newPackType, PackFromServerType, ParamsPackType} from "../../dal/cardsApi";
import {authApi} from "../../dal/authApi";
import {handlerAppError} from "../../utilities/handlerAppError";
import {Dispatch} from "redux";
import {AppRootStateType, AppThunkType} from "../store";
import {setIsLoggedInAC} from "./loginReducer";

const SET_PACKS = 'loginReducer/SET_PACKS'
const ADD_PACK = 'loginReducer/ADD_NEW_PACK'
const DELETE_PACK = 'loginReducer/DELETE_PACK'
const CHANGE_PACK = 'loginReducer/CHANGE_PACK'
const initialState = [
        { } as PackType
    ]

type initialStateType = typeof initialState

export const PackReducer = (state = initialState, action: PackMainType): initialStateType => {
    switch (action.type) {
        case SET_PACKS:{
            return action.packs
        }
        case ADD_PACK:{
            return  [action.newPack, ...state]
        }
        case DELETE_PACK:{
            return state.filter(pack => pack._id !== action.packID)
        }
        case CHANGE_PACK:{
            return  state.map(pack => pack._id === action.Pack._id ? {...pack, ...action.Pack} : pack)
        }

        default:
            return state
    }
}

export const setPacksAC = (packs: Array<PackType>) => ({type: SET_PACKS, packs} as const)
export const addPackAC=(newPack:newPackType)=>({type:ADD_PACK, newPack}as const)
export const deletePackAC=(packID: string)=>({type:DELETE_PACK, packID}as const)
export const changePackAC=(Pack:PackFromServerType)=>({type: CHANGE_PACK, Pack}as const)

export type PackMainType = AppMainType | ReturnType<typeof setPacksAC>
    | ReturnType<typeof addPackAC>| ReturnType<typeof deletePackAC>| ReturnType<typeof changePackAC>



export const setPacksAT =(params:ParamsPackType) => async (dispatch:Dispatch, getState: () => AppRootStateType) =>{
    const packs = getState().Packs
    try {
        dispatch(setAppStatusAC('loading'))
        dispatch(setAppErrorAC(null))
        const res = await cardsApi.getPacks(params)
        dispatch(setPacksAC(res.data.cardPacks))
    } catch (error) {
        handlerAppError(error, dispatch)
    } finally {
        dispatch(setIsInitializedAC())
        dispatch(setAppStatusAC('idle'))
    }
}

export const addPackAT =(params:ParamsPackType, name?:string):AppThunkType => async (dispatch)=>{
    try {
        dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC('loading'))
        const res= await cardsApi.createNewPack(name)
        //dispatch(addPackAC(res.data))
        dispatch(setPacksAT(params))
    } catch (error) {
        handlerAppError(error, dispatch);
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}
export const deletePackAT=(packID: string,params:ParamsPackType):AppThunkType => async (dispatch)=>{
    try {
        dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC('loading'))
        await cardsApi.deletePack(packID)
        dispatch(deletePackAC(packID))
        dispatch(setPacksAT(params))
    } catch (error) {
        handlerAppError(error, dispatch);
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}
export const changePackTC =(packID: string, modelPack:PackType,params:ParamsPackType):AppThunkType=>async (dispatch,getState: () => AppRootStateType )=>{

    const pack = getState().Packs.find(p=> packID===p._id)
    const apiModel ={...pack,...modelPack}

    try {
        dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC('loading'))
        const res= await cardsApi.changePack(apiModel)
        dispatch(changePackAC(res.data))
        dispatch(setPacksAT(params))
    } catch (error) {
        handlerAppError(error, dispatch);
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export  type PackType={
    _id?:  string
    user_id?: string
    name?:  string
    path?:  string // папка
    cardsCount?:  number
    grade?: number // средняя оценка карточек
    shots?:  number // количество попыток
    rating?:  number // лайки
    type?: "pack" |"folder"  // ещё будет "folder" (папка)
    created?:  string
    updated?: string
    __v?: number
}