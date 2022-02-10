import {Route, Routes} from "react-router-dom";
import {Profile} from "../Profile/Profile";
import {Login} from "../auth/Login/Login";
import {Register} from "../auth/Register/Register";
import {PasswordRecovery} from "../auth/ForgotPass/passwordRecovery";
import React from "react";

export const PATH = {
    START_PAGE: '/*',
    LOGIN_PAGE: '/login',
    PROFILE_PAGE: '/profile',
    REGISTRATION_PAGE: '/register',
    FORGOT_PAGE:'/passwordRecovery',

/*    CREATE_NEW_PASSWORD_PAGE: '/set-new-password/:token',
    CHECK_EMAIL_PAGE: '/check_email',
    ERROR404_PAGE: '/error404',*/
}

function Routing() {
    return (
        <div>
            <Routes>
                <Route path = {PATH.START_PAGE} element={<Profile/>}/>
                <Route path= {PATH.LOGIN_PAGE} element={<Login/>}/>
                <Route path={PATH.REGISTRATION_PAGE} element={<Register/>}/>
                <Route path={PATH.FORGOT_PAGE} element={<PasswordRecovery/>}/>
                <Route path={PATH.PROFILE_PAGE} element={<Profile/>}/>
            </Routes>
        </div>
    )
}

export default Routing