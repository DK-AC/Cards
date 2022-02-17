import axios, {AxiosResponse} from "axios";
import {PackType} from "../bll/reducers/packReducer";

const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    baseURL: 'http://localhost:7542/2.0',
    withCredentials: true,
})

export const cardsApi = {
    getPacks(params: ParamsPackType) {
        return instance.get<cardPacksType>('/cards/pack', {params: params})
    },
    createNewPack(name: string = 'test') {
        let cardsPack: newPackType = {
            name: name,
            path: "/def",
            grade: 0,
            shots: 0,
            rating: 0,
            deckCover: "url or base64",
            private: false,
            type: "pack"
        }
        return instance.post<newPackType, AxiosResponse<PackFromServerType>>('/cards/pack', {cardsPack})
    },
    deletePack(packID: string) {
        return instance.delete(`/cards/pack?id=${packID}`)
    },
    changePack(cardsPack: PackType) {
        return instance.put<PackType, AxiosResponse<PackFromServerType>>('/cards/pack', {cardsPack})
    },
    getCards(params: ParamsCardType) {
        return instance.get<CardsType>('/cards/card', {params: params})
    }
}

export type PackFromServerType = {
    _id: string
    user_id: string
    name: string
    path?: string // папка
    cardsCount: number
    grade: number // средняя оценка карточек
    shots: number // количество попыток
    rating: number // лайки
    type: "pack" | "folder"  // ещё будет "folder" (папка)
    created: string
    updated: string
    __v: number
}
export type cardPacksType = {
    cardPacks: Array<PackFromServerType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type newPackType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: "pack" | "folder"
}

export type ParamsPackType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: number
    page?: number
    pageCount?: number
    user_id?: string
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
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}

export type CardsType = {
    cards: Array<CardFromServerType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId:string
    page: number
    pageCount: number
}

