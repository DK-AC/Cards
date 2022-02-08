import {applyMiddleware, combineReducers, createStore} from "redux";
import {loginReducer} from "./reducers/loginReducer";
import {passwordRecoveryReducer} from "./reducers/passwordRecoveryReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {registerReducer} from "./reducers/registerReducer";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    passwordRecovery: passwordRecoveryReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store