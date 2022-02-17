import axios, {AxiosResponse} from "axios";
import {newPackType, PackFromServerType} from "./packsApi";

const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    baseURL: 'http://localhost:7542/2.0',
    withCredentials: true,
})

export const cardsApi = {
    getCards(params: ParamsCardType) {
        return instance.get<CardsType>('/cards/card', {params: params})
    },
    createNewCard(card:CardFromServerType) {
        return instance.post<newPackType, AxiosResponse<CardFromServerType>>('/cards/card', {card})
    }
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
    cardsPack_id: string | undefined
    user_id?: string
    answer: "no question" | string
    question: "no answer" | string
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

