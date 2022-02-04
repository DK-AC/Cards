import {combineReducers, createStore} from "redux";
import {loginReducer} from "./reducers/loginReducer";
import {registrReducer} from "./reducers/registReducer";
import {forgotPassReducer} from "./reducers/forgotPassReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

export const rootReducer = combineReducers({
    login: loginReducer,
    registr: registrReducer,
    forgotPass: forgotPassReducer
})

export type AppRootStateType = any

export const store = createStore(rootReducer)
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector