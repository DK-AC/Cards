import React, {useEffect} from 'react';
import './App.css';
import {Register} from "./ui/auth/Register/Register";
import {Login} from "./ui/auth/Login/Login";
import {PasswordRecovery} from "./ui/auth/ForgotPass/passwordRecovery";
import {Routes, Route, useNavigate} from "react-router-dom"
import {Profile} from "./ui/Profile/Profile";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppSelector} from "./bll/store";
import {logoutTC} from "./bll/reducers/loginReducer";
import Routing, {PATH} from "./ui/1-Routes/Routes";
import {iconClasses} from "@mui/material";
import style from './App.module.css'
import {ReusableButton} from "./ui/ReusableComponents/ReusableButton/ReusableButton";
import {isAuthTC} from "./bll/reducers/appReducer";

function App() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.Login.isLogged)

    useEffect(() => {
        dispatch(isAuthTC())
    }, [])
    if (!isInitialized){
        return <div>loading</div>
    }

    const logoutHandler = () =>{
        dispatch(logoutTC())
        navigate(PATH.LOGIN_PAGE)
    }

    return (
        <div className={style.App}>
            <div className={style.container}>
                {isLoggedIn && <ReusableButton title={'logout'} onClickHandler={logoutHandler} />}
                <Routing/>
            </div>
        </div>
    );
}

export default App;
