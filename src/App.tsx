import React, {useCallback, useEffect} from 'react';
import './App.css';
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux";
import {useAppSelector} from "./bll/store";
import {logoutTC, setIsLoggedInAC} from "./bll/reducers/loginReducer";
import Routing, {PATH} from "./ui/Routes/Routes";
import style from './App.module.css'
import {ReusableButton} from "./ui/ReusableComponents/ReusableButton/ReusableButton";
import {isAuthTC} from "./bll/reducers/appReducer";
import {Login} from "./ui/auth/Login/Login";
import {restoreState, saveState} from "./dal/localStorage/localStorage";


function App() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //const isLoggedIn = useAppSelector<boolean>(state => state.Login.isLogged)
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)
    let isLoggedIn = restoreState('isLogged', false)


    useEffect(() => {
        dispatch(isAuthTC())
        debugger
        if (isInitialized && isLoggedIn) {
                navigate(PATH.PROFILE_PAGE)} else{
            navigate(PATH.LOGIN_PAGE)
        }
        /*if (isInitialized && !isLoggedIn) {
            navigate(PATH.LOGIN_PAGE)
        } else if(!isInitialized && isLoggedIn){
            navigate(PATH.LOGIN_PAGE)
        }*/

    }, [])


const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    navigate(PATH.LOGIN_PAGE)
    saveState('isLogged', false)
    }, [isLoggedIn])


   /*const logoutHandler =()=> {
        navigate(PATH.LOGIN_PAGE)
        dispatch(logoutTC())
       saveState('isLogged', false)
        console.log(isLoggedIn)
    }*/
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
