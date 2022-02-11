import React, {useCallback, useEffect} from 'react';
import './App.css';
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux";
import {useAppSelector} from "./bll/store";
import {logoutTC} from "./bll/reducers/loginReducer";
import Routing, {PATH} from "./ui/Routes/Routes";
import style from './App.module.css'
import {ReusableButton} from "./ui/ReusableComponents/ReusableButton/ReusableButton";
import {isAuthTC} from "./bll/reducers/appReducer";


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


    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
        navigate(PATH.LOGIN_PAGE)
    },[dispatch,logoutTC])


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
