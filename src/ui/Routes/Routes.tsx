import {Route, Routes} from "react-router-dom";
import {Login} from "../auth/Login/Login";
import {Register} from "../auth/Register/Register";
import {PasswordRecovery} from "../auth/ForgotPass/passwordRecovery";
import React from "react";
import CheckEmail from "../auth/ForgotPass/ChackEmail";
import PasswordEnter from "../auth/ForgotPass/PasswordEnter";
import Profile from "../Profile/Profile";
import PacksTable from "../Cards/Pack/PacksTable";
import {AuthProvider} from "../../bll/HOK/AuthProvider";
import CardsTable from "../Cards/Card/CardsTable";

export const PATH = {
    START_PAGE: '/',
    LOGIN_PAGE: '/login',
    PROFILE_PAGE: '/profile',
    REGISTRATION_PAGE: '/register',
    FORGOT_PAGE: '/passwordRecovery',
    CHECK_EMAIL_PAGE: '/check_email',
    CREATE_NEW_PASSWORD_PAGE: '/set-new-password/:token',
    PACKS_TABLE_PAGE: '/packs',
    CARDS_TABLE_PAGE:'/cards/:id'
}


function Routing() {
    return (
        <AuthProvider>
            <Routes>
                <Route path={PATH.START_PAGE} element={<Profile/>}/>
                <Route path={PATH.LOGIN_PAGE} element={<Login/>}/>
                <Route path={PATH.REGISTRATION_PAGE} element={<Register/>}/>
                <Route path={PATH.FORGOT_PAGE} element={<PasswordRecovery/>}/>
                <Route path={PATH.CHECK_EMAIL_PAGE} element={<CheckEmail/>}/>
                <Route path={PATH.PROFILE_PAGE} element={<Profile/>}/>
                <Route path={PATH.CREATE_NEW_PASSWORD_PAGE} element={<PasswordEnter/>}/>
                <Route path={PATH.PACKS_TABLE_PAGE} element={<PacksTable/>}/>
                <Route path={PATH.CARDS_TABLE_PAGE} element={<CardsTable/>}/>
            </Routes>
        </AuthProvider>
    )
}

export default Routing