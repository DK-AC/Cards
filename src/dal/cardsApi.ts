import axios, {AxiosResponse} from "axios";
import {CardType} from "../bll/reducers/cardReducer";

const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    baseURL: 'http://localhost:7542/2.0',
    withCredentials: true,
})

export const cardsApi = {
    getCards(params: ParamsCardType) {
        return instance.get<CardsType>('/cards/card', {params: params})
    },
    createNewCard(createdCard: /*CardFromServerType*/  cardsFromUserForCreatingType) {
        let card: cardsFromUserForCreatingType = {
            cardsPack_id: createdCard.cardsPack_id,
            answer: createdCard.answer,
            question: createdCard.question,
            type: 'card',
            answerImg: "url or base 64",
            questionImg: "url or base 64",
            questionVideo: "url or base 64",
            answerVideo: "url or base 64",
            grade: 0,
            shots: 0,
            rating: 0
        }
        return instance.post<cardsFromUserForCreatingType, AxiosResponse<CardFromServerType>>('/cards/card', {card})
    },
    deleteCard(cardId: string | undefined) {
        return instance.delete<CardFromServerType>(`/cards/card?id=${cardId}`)
    },
    changeCard(card: CardFromServerType) {
        return instance.put<CardType, AxiosResponse<CardFromServerType>>('/cards/card', {card})
    },
    updateGrade(data: GradeType) {
        return instance.put<GradeType, AxiosResponse<updatedGradeType>>('/cards/grade', data)
    }
}
export type GradeType = {
    grade: number,
    card_id: string | undefined
}
export type updatedGradeType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: "5eb543f6bea3ad21480f1ee7"
    grade: number
    shots: number
}
export type cardsFromUserForCreatingType = {
    cardsPack_id?: string
    answer?: "no question" | string
    question?: "no answer" | string
    type?: "card" | string
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    grade?: number,
    shots?: number,
    rating?: number
}


export type ParamsCardType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    min?: number
    max?: number
    sortCards?: number
    page?: number
    pageCount?: number
}

export type CardFromServerType = {
    _id?: string | undefined
    cardsPack_id?: string | undefined
    user_id?: string
    answer?: "no question" | string
    question?: "no answer" | string
    grade?: number
    shots?: number
    comments?: string
    type?: "card" | string
    rating?: number
    more_id?: string
    created?: string
    updated?: string
    __v?: number
}

export type CardsType = {
    cards: Array<CardFromServerType>
    packUserId: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
}

