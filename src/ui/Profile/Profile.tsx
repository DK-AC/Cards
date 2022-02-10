import React from 'react';
import {ReusableButton} from "../ReusableComponents/ReusableButton/ReusableButton";
import {useAppSelector} from "../../bll/store";
import {logoutTC} from "../../bll/reducers/loginReducer";
import {PATH} from "../1-Routes/Routes";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export const Profile = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.Login.isLogged)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = () =>{
        dispatch(logoutTC())
        navigate(PATH.LOGIN_PAGE)
    }
    return (
        <div>
            Profile
            {!isLoggedIn && <ReusableButton title={'logout'} onClickHandler={logoutHandler} />}
        </div>
    );
};

