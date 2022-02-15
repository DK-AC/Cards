import {AppMainType, setAppErrorAC, setAppStatusAC, setIsInitializedAC} from "./appReducer";
import {cardsApi, PackFromServerType} from "../../dal/cardsApi";
import {authApi} from "../../dal/authApi";
import {handlerAppError} from "../../utilities/handlerAppError";
import {Dispatch} from "redux";

const SET_PACKS = 'loginReducer/SET_PACKS'

const initialState = [
        {    _id: '1' ,
            user_id: '777' ,
            name: 'first  pack',
            cardsCount: 0,
            grade: 0,// средняя оценка карточек
            shots: 0, // количество попыток
            rating: 0, // лайки
            type: "pack" , // ещё будет "folder" (папка)
            created: "2020-05-09T15:40:40.339Z",
            updated: "2021-06-06T15:40:40.339Z",
        } as PackType
    ]

type initialStateType = typeof initialState

export const PackReducer = (state = initialState, action: PackMainType): initialStateType => {
    switch (action.type) {
        case SET_PACKS:{
            return action.packs
        }
        default:
            return state
    }
}

export const setPacksAC = (packs: Array<PackType>) => ({type: SET_PACKS, packs} as const)

export type PackMainType = AppMainType | ReturnType<typeof setPacksAC>

export const setPacksAT =()=> async (dispatch: Dispatch) =>{
    try {
        dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC('loading'));
        const res = await cardsApi.getPacks()
        setPacksAC(res.data.data.cardPacks)
    } catch (error) {
        handlerAppError(error, dispatch)
    } finally {
        dispatch(setIsInitializedAC())
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