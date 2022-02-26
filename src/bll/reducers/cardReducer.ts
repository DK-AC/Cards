import {AppMainType, setAppErrorAC, setAppStatusAC, setIsInitializedAC} from "./appReducer";
import {Dispatch} from "redux";
import {AppRootStateType, AppThunkType} from "../store";
import {handlerAppError} from "../../utilities/handlerAppError";
import {
    CardFromServerType,
    cardsApi,
    cardsFromUserForCreatingType,
    CardsType,
    GradeType,
    ParamsCardType
} from "../../dal/cardsApi";

const SET_CARDS = 'cardReducer/SET_CARDS'
const ADD_CARD = 'cardReducer/ADD_NEW_CARD'
const DELETE_CARD = 'cardReducer/DELETE_CARD'
// const CHANGE_CARD = 'cardReducer/CHANGE_CARD'
const CHANGE_GRADE = 'cardReducer/CHANGE_GRADE'

const initialState = {
    cards: [] as Array<CardType>,
    cardsTotalCount: 0,
    grade: 1
}

type initialStateType = typeof initialState

export const CardReducer = (state = initialState, action: CardMainType): initialStateType => {
    switch (action.type) {
        case SET_CARDS: {
            return {...state, cards: action.cards.cards, cardsTotalCount: action.cards.cardsTotalCount}
        }
        case ADD_CARD: {
            return {...state, cards: [action.newCard, ...state.cards]}
        }
        case DELETE_CARD: {
            return {
                ...state,
                cards: state.cards.filter(card => card._id !== action.cardId)
            }
        }
        // case CHANGE_CARD: {
        //     return {
        //         ...state, cards: state.cards
        //             .map(card => card._id === action.Card._id ? {...card, ...action.Card} : card)
        //     }
        // }
        case CHANGE_GRADE: {
            return {
                ...state, grade: action.data.grade
            }
        }
        default:
            return state
    }
}

//actions
export const setCardsAC = (cards: CardsType) => ({type: SET_CARDS, cards} as const)
export const addCardAC = (newCard: CardFromServerType) => ({type: ADD_CARD, newCard} as const)
export const deleteCardAC = (cardId: string) => ({type: DELETE_CARD, cardId} as const)
// export const changeCardAC = (Card: CardFromServerType) => ({type: CHANGE_CARD, Card} as const)
export const changeGradeAC = (data: GradeType) => ({type: CHANGE_GRADE, data} as const)


//thunks
export const setCardsTC = (params: ParamsCardType) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    try {
        dispatch(setAppStatusAC('loading'))
        dispatch(setAppErrorAC(null))
        const res = await cardsApi.getCards(params)
        dispatch(setCardsAC(res.data))
    } catch (error) {
        handlerAppError(error, dispatch)
    } finally {
        dispatch(setIsInitializedAC())
        dispatch(setAppStatusAC('idle'))
    }
}
export const addCardTC = (params: ParamsCardType, card: cardsFromUserForCreatingType): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC('loading'))
        await cardsApi.createNewCard(card)
        // dispatch(addCardAC(card))
        await dispatch(setCardsTC(params))
    } catch (error) {
        handlerAppError(error, dispatch);
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}
export const deleteCardTC = (cardId: string, params: CardType): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC('loading'))
        await cardsApi.deleteCard(cardId)
        // dispatch(deleteCardAC(cardId))
        await dispatch(setCardsTC(params))
    } catch (error) {
        handlerAppError(error, dispatch);
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}
export const changeCardTC = (cardID: string, modelCard: CardFromServerType, params: ParamsCardType): AppThunkType => async (dispatch, getState: () => AppRootStateType) => {

    const card = getState().Cards.cards.find(c => cardID === c._id)
    const apiModel = {...card, ...modelCard}

    try {
        dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC('loading'))
        const res = await cardsApi.changeCard(apiModel)
        await dispatch(setCardsTC(params))
    } catch (error) {
        handlerAppError(error, dispatch);
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const changeGradeTC = (data: GradeType): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppErrorAC(null))
        dispatch(setAppStatusAC('loading'))
        await cardsApi.updateGrade(data)
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
    | ReturnType<typeof deleteCardAC>
    // | ReturnType<typeof changeCardAC>
    | ReturnType<typeof changeGradeAC>


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
