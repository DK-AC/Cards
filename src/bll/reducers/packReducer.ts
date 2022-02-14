import {AppMainType} from "./appReducer";

const initialState = {

}
type initialStateType = typeof initialState

export const packReducer = (state = initialState, action: PackMainType): initialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export type PackMainType = AppMainType