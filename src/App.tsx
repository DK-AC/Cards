import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useAppSelector} from "./bll/store";
import Routing from "./ui/Routes/Routes";
import style from './App.module.css'
import {isAuthTC} from "./bll/reducers/appReducer";
import {clearState} from "./dal/localStorage/localStorage";
import {Header} from "./ui/components/header/Header";


function App() {

    const dispatch = useDispatch();

    const cookiesAreAlive = useAppSelector<boolean>(state => state.App.cookiesAreAlive)

    useEffect(() => {
        dispatch(isAuthTC())
        if (!cookiesAreAlive) {
            clearState('isLogged', false)
        }
    }, [])


    return (
        <div className={style.App}>
            <Header/>
            <div className={style.container}>
                <Routing/>
            </div>
        </div>
    );
}

export default App;
