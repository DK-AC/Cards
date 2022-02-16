const initialState: InitialStateType = {
    _id: '',
    email: '',
    name: '',
    publicCardPacksCount: 0,
    created: new Date(),
    updated: new Date(),
    isAdmin: false,
    verified: false,
    rememberMe: false,
    token:'',
    tokenDeathTime: new Date(),
    _v:''

}
export const ProfileReducer = (state: InitialStateType = initialState, action: ProfileMainType): InitialStateType => {
    switch (action.type) {
        case "AUTH/SET_PROFILE": {
            return {...state, ...action.data}
        }
        default:
            return state
    }
}

export const setProfile = (data:any) => ({
    type: 'AUTH/SET_PROFILE', data
}) as const

export type InitialStateType = {
    _id: string
    email: string
    name: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    token: string
    tokenDeathTime: Date
    _v:string
}

export type ProfileMainType = SetProfileType
type SetProfileType = ReturnType<typeof setProfile>