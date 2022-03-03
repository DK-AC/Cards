import {NavLink, useNavigate} from "react-router-dom";
import style from "./Header.module.css";
import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {PATH} from "../../Routes/Routes";
import {logoutTC} from "../../../bll/reducers/loginReducer";
import {restoreState, saveState} from "../../../dal/localStorage/localStorage";
import {CircularProgress} from "@mui/material";
import {useAppSelector} from "../../../bll/store";

export const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)
    let isLoggedIn = restoreState('isLogged', false)

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
        navigate(PATH.LOGIN_PAGE)
        saveState('isLogged', false)
    }, [isLoggedIn])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress size={'8rem'}/>
        </div>
    }

    return (
        <header className={style.header}>
            <h1 className={style.title}>Learn Cards</h1>
            <div className={style.itemsWrapper}>
                <NavLink className={({isActive}) => (isActive ? style.activeRoute : style.item)}
                         to={PATH.PACKS_TABLE_PAGE}>
                    Pack lists
                </NavLink>
                <NavLink className={({isActive}) => (isActive ? style.activeRoute : style.item)}
                         to={PATH.PROFILE_PAGE}>
                    Profile page
                </NavLink>
            </div>
            <button className={style.borderButton} onClick={logoutHandler}>Logout</button>
        </header>
    );
};