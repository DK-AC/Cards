import {combineReducers, createStore} from "redux";
import {loginReducer} from "./reducers/loginReducer";
import {forgotPassReducer} from "./reducers/forgotPassReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {registerReducer} from "./reducers/registeReducer";

export const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    forgotPass: forgotPassReducer
})

export type AppRootStateType = any

export const store = createStore(rootReducer)
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector