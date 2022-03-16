import {UserType} from "../../dal/authApi";

const SET_PROFILE = 'profileReducer/SET_PROFILE'
const CHANGE_PROFILE = 'profileReducer/CHANGE_PROFILE'

const initialState: InitialStateType = {
    _id: '',
    email: '',
    name: '',
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    isAdmin: false,
    verified: false,
    rememberMe: false,
    //token:'',
    //tokenDeathTime: new Date(),
    _v:'',
    avatar:'',
}
export const ProfileReducer = (state: InitialStateType = initialState, action: ProfileMainType): InitialStateType => {
    switch (action.type) {
        case SET_PROFILE : {
            return {...state, ...action.data}
        }
       case CHANGE_PROFILE:{
            return {...state,  ...action.payload}
        }
        case 'CHANGE_IMG':{
            return {...state,  ...action.payload}
        }
        default:
            return state
    }
}

export const setProfile = (data:UserType) => ({type: SET_PROFILE, data}) as const
export const changeProfile = (name:string) => ({type: CHANGE_PROFILE, payload:{name}}) as const
export const changeIMG = (fileURL:any)=> ({type: 'CHANGE_IMG', payload:{avatar:fileURL}}) as const




export type InitialStateType = {
    _id: string
    email: string
    name: string
    publicCardPacksCount: number
    created: string
    updated: string
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    //token: string
    //tokenDeathTime: Date
    _v?:string
    avatar:string
}

export type ProfileMainType = SetProfileType |ReturnType<typeof changeProfile>|ReturnType<typeof changeIMG>
type SetProfileType = ReturnType<typeof setProfile>