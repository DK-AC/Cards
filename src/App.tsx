import React, {useCallback, useEffect} from 'react';
import './App.css';
import {useLocation, useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux";
import {useAppSelector} from "./bll/store";
import {logoutTC, setIsLoggedInAC} from "./bll/reducers/loginReducer";
import Routing, {PATH} from "./ui/Routes/Routes";
import style from './App.module.css'
import {ReusableButton} from "./ui/ReusableComponents/ReusableButton/ReusableButton";
import {isAuthTC} from "./bll/reducers/appReducer";
import {Login} from "./ui/auth/Login/Login";
import {clearState, restoreState, saveState} from "./dal/localStorage/localStorage";
import {CircularProgress} from "@mui/material";


function App() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)
    const cookiesAreAlive = useAppSelector<boolean>(state => state.App.cookiesAreAlive)
     let isLoggedIn = restoreState('isLogged', false)


    useEffect(() => {
        dispatch(isAuthTC())
        debugger
        if(!cookiesAreAlive){
            clearState('isLogged', false)
        }
    }, [])

const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    navigate(PATH.LOGIN_PAGE)
    saveState('isLogged', false)
    }, [isLoggedIn])

    if (!isInitialized){
       return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress />
        </div>
    }

    return (
        <div className={style.App}>
            <div className={style.container}>
                {isLoggedIn && <div className={style.position}><ReusableButton title={'logout'} onClickHandler={logoutHandler}/></div>}
                <Routing/>
            </div>
        </div>
    );
}

export default App;
