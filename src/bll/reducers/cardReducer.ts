import {cardsApi, CardsType, ParamsCardType} from "../../dal/cardsApi";
import {AppMainType, setAppErrorAC, setAppStatusAC, setIsInitializedAC} from "./appReducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";
import {handlerAppError} from "../../utilities/handlerAppError";

const SET_CARDS = 'cardReducer/SET_CARDS'

const initialState = {
    cards: [] as Array<CardType>,
    page: 1,
    pageCount: 10,
    cardsTotalCount: 10,
    maxGrade: 0,
    minGrade: 0,
    packUserId: '',
    totalCount: 0,
    currentCardsPackID: '',
    sortCardsMethod: undefined,
    currentGrade: [0, 0],
    countPerPage: [10, 25, 50]
}

type initialStateType = typeof initialState

export const CardReducer = (state = initialState, action: CardMainType): initialStateType => {
    switch (action.type) {
        case SET_CARDS: {
            debugger
            return {...state, ...action.cards}
        }
        default:
            return state

    }
}


//actions
export const setCardsAC = (cards: CardsType) => ({type: SET_CARDS, cards} as const)

//thunks
export const setCardsTC = (params: ParamsCardType) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const cards = getState().Cards
    try {
        const response = await cardsApi.getCards({
            cardsPack_id: cards.currentCardsPackID || params?.cardsPack_id,
            page: cards.page,
            pageCount: params?.pageCount || cards.pageCount,
            min: cards.currentGrade[0],
            max: cards.currentGrade[1],
            cardQuestion: params?.cardQuestion || undefined,
            cardAnswer: params?.cardAnswer || undefined,
            sortCards: cards.sortCardsMethod
        })
        dispatch(setAppStatusAC('loading'))
        dispatch(setAppErrorAC(null))
        dispatch(setCardsAC(response.data))
    } catch (error) {
        handlerAppError(error, dispatch)
    } finally {
        dispatch(setIsInitializedAC())
        dispatch(setAppStatusAC('idle'))
    }
}

//types
export type CardMainType = AppMainType | ReturnType<typeof setCardsAC>

export type CardType = {
    answer?: string
    question?: string
    cardsPack_id?: string
    grade?: number
    rating?: number
    shots?: number
    type?: string
    updated?: string
    created?: string
    user_id?: string
    __v?: number
    _id?: string
}