import React, {useEffect} from 'react';
import './App.css';
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux";
import {useAppSelector} from "./bll/store";
import {logoutTC} from "./bll/reducers/loginReducer";
import Routing, {PATH} from "./ui/Routes/Routes";
import style from './App.module.css'
import {ReusableButton} from "./ui/ReusableComponents/ReusableButton/ReusableButton";
import {isAuthTC, RequestStatusType} from "./bll/reducers/appReducer";
import {CircularProgress} from "@mui/material";

function App() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.Login.isLogged)
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)

    useEffect(() => {
        dispatch(isAuthTC())
        if(isInitialized && !isLoggedIn){
            navigate(PATH.LOGIN_PAGE)
        }
    }, [dispatch])


    const logoutHandler = () => {
        dispatch(logoutTC())
        navigate(PATH.LOGIN_PAGE)
    }


    return (
        <div className={style.App}>
            <div className={style.container}>
                {isLoggedIn && <ReusableButton title={'logout'} onClickHandler={logoutHandler}/>}
                <Routing/>
            </div>
        </div>
    );
}

export default App;
