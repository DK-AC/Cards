import axios, {AxiosResponse} from "axios";
import {LoginParamsType, ResponseType, UserType} from "./mainAPI";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    // baseURL: 'http://localhost:7542/2.0',
    withCredentials: true,
})

export const cardsApi ={
    getPacks() {
        return instance.get<AxiosResponse<cardPacksType>>('/cards/pack')
    },
}

export type PackFromServerType={
    _id: string
    user_id: string
    name: string
    path?: string // папка
    cardsCount: number
    grade: number // средняя оценка карточек
    shots: number // количество попыток
    rating: number // лайки
    type: "pack" |"folder"  // ещё будет "folder" (папка)
    created: string
    updated: string
    __v: number
}

export type cardPacksType ={
    cardPacks: Array<PackFromServerType>
    cardPacksTotalCount: number// количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}
