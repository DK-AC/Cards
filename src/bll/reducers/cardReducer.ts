import {AppMainType, setAppErrorAC, setAppStatusAC, setIsInitializedAC} from "./appReducer";
import {Dispatch} from "redux";
import {AppRootStateType, AppThunkType} from "../store";
import {handlerAppError} from "../../utilities/handlerAppError";
import {CardFromServerType, cardsApi, CardsType, ParamsCardType} from "../../dal/cardsApi";

const SET_CARDS = 'cardReducer/SET_CARDS'
const ADD_CARD = 'cardReducer/ADD_NEW_CARD'
const CHANGE_CARD_PAGE = 'cardReducer/CHANGE_CARD_PAGE'
const CHANGE_CARD_COUNT_ITEMS = 'cardReducer/CHANGE_CARD_COUNT_ITEMS'

const initialState = {
    cards: [] as Array<CardType>,
    page: 1,
    pageCount: 5,
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packUserId: '',
}

type initialStateType = typeof initialState

export const CardReducer = (state = initialState, action: CardMainType): initialStateType => {
    switch (action.type) {
        case SET_CARDS: {
            return {...state, ...action.cards}
        }
        case ADD_CARD: {
            return {...state, cards: [action.newCard, ...state.cards]}
        }
        case CHANGE_CARD_PAGE: {
            return {...state, page: action.page}
        }
        case CHANGE_CARD_COUNT_ITEMS: {
            return {...state, pageCount: action.pageCount}
        }
        default:
            return state
    }
}

//actions
export const setCardsAC = (cards: CardsType) => ({type: SET_CARDS, cards} as const)
export const addCardAC = (newCard: CardFromServerType) => ({type: ADD_CARD, newCard} as const)
export const changeCardPageAC = (page: number) => ({type: CHANGE_CARD_PAGE, page} as const)
export const changeItemsOnCardPageAC = (pageCount: number) => ({type: CHANGE_CARD_COUNT_ITEMS, pageCount} as const)

//thunks
export const setCardsTC = (params: ParamsCardType) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const cards = getState().Cards
    try {
        const res = await cardsApi.getCards(params)
        dispatch(setAppStatusAC('loading'))
        dispatch(setAppErrorAC(null))
        dispatch(setCardsAC(res.data))
    } catch (error) {
        handlerAppError(error, dispatch)
    } finally {
        dispatch(setIsInitializedAC())
        dispatch(setAppStatusAC('idle'))
    }
}
export const addCardTC = (params: ParamsCardType, card: CardFromServerType): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC('loading'))
        await cardsApi.createNewCard(card)
        dispatch(addCardAC(card))
        dispatch(setCardsTC({cardsPack_id: params.cardsPack_id}))
    } catch (error) {
        handlerAppError(error, dispatch);
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

//types
export type CardMainType =
    AppMainType
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof addCardAC>
    | ReturnType<typeof changeCardPageAC>
    | ReturnType<typeof changeItemsOnCardPageAC>


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