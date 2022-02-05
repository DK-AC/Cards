import {applyMiddleware, combineReducers, createStore} from "redux";
import {loginReducer} from "./reducers/loginReducer";
import {forgotPassReducer} from "./reducers/forgotPassReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RegisterActionType, registerReducer} from "./reducers/registerReducer";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    forgotPass: forgotPassReducer
})

export type AppRootStateType = RegisterActionType

export const store = createStore(rootReducer, applyMiddleware(thunk))
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector