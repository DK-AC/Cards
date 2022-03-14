import {Route, Routes} from "react-router-dom";
import {Login} from "../auth/Login/Login";
import {Register} from "../auth/Register/Register";
import {PasswordRecovery} from "../auth/ForgotPass/passwordRecovery";
import React from "react";
import CheckEmail from "../auth/ForgotPass/ChackEmail";
import PasswordEnter from "../auth/ForgotPass/PasswordEnter";
import Profile from "../Profile/Profile";
import PacksTable from "../Cards/Pack/PacksTablePage";
import {AuthProvider} from "../../bll/HOK/AuthProvider";
import CardsTable from "../Cards/Card/CardsTablePage";
import LearningCard from "../LearningCard/LearningCard";
import ProfilePage from "../Profile/ProfilePage/ProfilePage";

export const PATH = {
    START_PAGE: '/',
    LOGIN_PAGE: '/login',
    PROFILE_PAGE: '/profile',
    REGISTRATION_PAGE: '/register',
    FORGOT_PAGE: '/passwordRecovery',
    CHECK_EMAIL_PAGE: '/check_email',
    CREATE_NEW_PASSWORD_PAGE: '/set-new-password/:token',
    PACKS_TABLE_PAGE: '/packs',
    CARDS_TABLE_PAGE:'/cards/:id',
    CARD_PAGE:'/cards/card/:id',
    PROFILE_INFO_PAGE: '/info_profile',
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
                <Route path={PATH.CARD_PAGE} element={<LearningCard />}/>
                <Route path={PATH.PROFILE_INFO_PAGE} element={<ProfilePage />}/>
            </Routes>
        </AuthProvider>
    )
}

export default Routing