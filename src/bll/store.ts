import {applyMiddleware, combineReducers, createStore} from "redux";
import {LoginMainType, LoginReducer} from "./reducers/loginReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import thunk, {ThunkAction} from "redux-thunk";
import {AppMainType, AppReducer} from "./reducers/appReducer";
import {ProfileMainType, ProfileReducer} from "./reducers/profileReducer";
import {PackMainType, PackReducer} from "./reducers/packReducer";

export const rootReducer = combineReducers({
    App: AppReducer,
    Login: LoginReducer,
    Profile: ProfileReducer,
    Packs:PackReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppActionsType =
    | AppMainType
    | ProfileMainType
    | LoginMainType
    |PackMainType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>