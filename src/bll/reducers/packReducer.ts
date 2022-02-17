import {AppMainType, isAuthTC, setAppErrorAC, setAppStatusAC, setIsInitializedAC} from "./appReducer";
import {cardPacksType,packsApi, newPackType, PackFromServerType,ParamsPackType} from "../../dal/packsApi";
import {authApi} from "../../dal/authApi";
import {handlerAppError} from "../../utilities/handlerAppError";
import {Dispatch} from "redux";
import {AppRootStateType, AppThunkType} from "../store";
import {setIsLoggedInAC} from "./loginReducer";

const SET_PACKS = 'loginReducer/SET_PACKS'
const ADD_PACK = 'loginReducer/ADD_NEW_PACK'
const DELETE_PACK = 'loginReducer/DELETE_PACK'
const CHANGE_PACK = 'loginReducer/CHANGE_PACK'
const CHANGE_PAGE ='loginReducer/CHANGE_PAGE'
const CHANGE_COUNT_ITEMS ='loginReducer/CHANGE_COUNT_ITEMS_ON_PAGE'

/*const initialState = [
        { } as PackType
    ]*/

const initialState = {
    cardPacks: [] as Array<PackType>,
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 4,
}

type initialStateType = typeof initialState

export const PackReducer = (state = initialState, action: PackMainType): initialStateType => {
    switch (action.type) {
        case SET_PACKS: {
            return {...state, ...action.packsINF, cardPacks: action.packsINF.cardPacks}
        }
        case ADD_PACK: {
            return {...state, cardPacks: [action.newPack,  ...state.cardPacks]}
        }
        case DELETE_PACK: {
            return  {...state,
                cardPacks: state.cardPacks.filter(pack => pack._id !== action.packID)}
        }
        case CHANGE_PACK: {
            return {...state,
                cardPacks: state.cardPacks.map(pack => pack._id === action.Pack._id ? {...pack, ...action.Pack} : pack)}
        }
        //pagination
        case CHANGE_PAGE:{
                return {...state, page: action.page}
            }
        case CHANGE_COUNT_ITEMS:{
            return {...state, pageCount: action.pageCount}
        }
        default:
            return state
    }
}

export const setPacksAC = (packsINF: cardPacksType) => ({type: SET_PACKS, packsINF} as const)
export const addPackAC = (newPack: newPackType) => ({type: ADD_PACK, newPack} as const)
export const deletePackAC = (packID: string) => ({type: DELETE_PACK, packID} as const)
export const changePackAC = (Pack: PackFromServerType) => ({type: CHANGE_PACK, Pack} as const)



export const changePageAC = (page: number) => ({type: CHANGE_PAGE, page} as const)
export const changeItemsOnPageAC = (pageCount: number) => ({type: CHANGE_COUNT_ITEMS, pageCount} as const)

export type PackMainType = AppMainType | ReturnType<typeof setPacksAC> | ReturnType<typeof addPackAC>
    | ReturnType<typeof deletePackAC> | ReturnType<typeof changePackAC> | ReturnType<typeof changePageAC>
    | ReturnType<typeof changeItemsOnPageAC>


export const setPacksAT = (params:ParamsPackType) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
   const page= getState().Packs.page
   const pageCount= getState().Packs.pageCount
    try {
        dispatch(setAppStatusAC('loading'))
        dispatch(setAppErrorAC(null))
        //Page pageCount
        const res = await packsApi.getPacks(params)
        dispatch(setPacksAC(res.data))
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
        const res= await packsApi.createNewPack(name)
        dispatch(addPackAC(res.data))
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
        await packsApi.deletePack(packID)
        dispatch(deletePackAC(packID))
        dispatch(setPacksAT(params))
    } catch (error) {
        handlerAppError(error, dispatch);
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}
export const changePackTC =(packID: string, modelPack:PackType,params:ParamsPackType):AppThunkType=>async (dispatch,getState: () => AppRootStateType )=>{

    const pack = getState().Packs.cardPacks.find(p => packID === p._id)
    const apiModel = {...pack, ...modelPack}

    try {
        dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC('loading'))
        const res = await packsApi.changePack(apiModel)
        dispatch(changePackAC(res.data))
        dispatch(setPacksAT(params))
    } catch (error) {
        handlerAppError(error, dispatch);
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export  type PackType = {
    _id?: string
    user_id?: string
    name?: string
    path?: string // папка
    cardsCount?: number
    grade?: number // средняя оценка карточек
    shots?: number // количество попыток
    rating?: number // лайки
    type?: "pack" | "folder"  // ещё будет "folder" (папка)
    created?: string
    updated?: string
    __v?: number
}