import React, {useEffect} from 'react';
import './App.css';
import {Register} from "./ui/auth/Register/Register";
import {Login} from "./ui/auth/Login/Login";
import {PasswordRecovery} from "./ui/auth/ForgotPass/passwordRecovery";
import {Routes, Route, useNavigate} from "react-router-dom"
import {Profile} from "./ui/Profile/Profile";
import {useDispatch} from "react-redux";
import {useAppSelector} from "./bll/store";
import {isAuth, logoutTC} from "./bll/reducers/loginReducer";

function App() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.Login.isLoggedIn)

    useEffect(() => {
        dispatch(isAuth())
    }, [])
    if (!isInitialized){
        return <div>loading</div>
    }

    const logoutHandler = () =>{
        dispatch(logoutTC())
        navigate('/login')
    }

    return (
        <div className="container">
            {isLoggedIn ? <button onClick={logoutHandler}>logout</button> :''}
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path = "/" element={<Profile/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/passwordRecovery" element={<PasswordRecovery/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </div>
    );
}

export default App;
