import React, {ChangeEventHandler, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../bll/store";
import {RequestStatusType, setAppErrorAC} from "../../../bll/reducers/appReducer";
import {setNewPasswordTC} from "../../../bll/reducers/loginReducer";
import {PATH} from "../../1-Routes/Routes";
import PaperContainer from "../../ReusableComponents/PaperContainer/PaperContainer";
import styles from "../Register/Register.module.css";
import {ErrorSnackbar} from "../../ReusableComponents/ErrorSnackbar/ErrorSnackbar";
import ReusableInput from "../../ReusableComponents/ReusableInput/ReusableInput";
import {ReusableButton} from "../../ReusableComponents/ReusableButton/ReusableButton";

const PasswordEnter = () => {
    const {resetPasswordToken}= useParams<string>()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isRequestSucceeded = useAppSelector<boolean>(state=>state.Login.isRequestSucceeded)
    const error= useAppSelector<string | null>(state => state.App.error)
    const status = useAppSelector<RequestStatusType>(stare=> stare.App.status)

    const [password,setPassword]= useState<string>('')
    const [password2,setPassword2]= useState<string>('')
    const handlePassword:ChangeEventHandler<HTMLInputElement>=(e)=>{
        setPassword(e.currentTarget.value)
        dispatch(setAppErrorAC(''))
    }
    const handlePassword2:ChangeEventHandler<HTMLInputElement>=(e)=>{
        setPassword2(e.currentTarget.value)
        dispatch(setAppErrorAC(''))
    }

    const  handleSubmit =()=>{
       /* e.preventDefault()*/
        if (password===password2) {
            resetPasswordToken ? dispatch(setNewPasswordTC({password, resetPasswordToken})) : dispatch(setAppErrorAC('missing token'))
        }else {
            dispatch(setAppErrorAC('Passwords is different'))
        }
    }
    if (isRequestSucceeded){
        navigate(PATH.LOGIN_PAGE)
    }
    return (
        <PaperContainer  title={'Create new password'}>
            <form>
                <ReusableInput value={password}
                               placeholder={'Password*'}
                               onChangeHandler={handlePassword}
                />
                <ReusableInput value={password}
                               placeholder={'Confirm Password*'}
                               onChangeHandler={handlePassword2}
                />
                <ReusableButton title={'Update Password'}
                                onClickHandler={handleSubmit}
                                disabled={status === 'loading' || !!error}
                />

            </form>
            {error  && <ErrorSnackbar/> }
        </PaperContainer>
    );
};

export default PasswordEnter;