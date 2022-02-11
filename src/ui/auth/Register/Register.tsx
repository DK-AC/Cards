import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './Register.module.css'
import {useDispatch} from "react-redux";
import {NavLink, useNavigate} from 'react-router-dom';
import {useAppSelector} from "../../../bll/store";
import {ErrorSnackbar} from "../../ReusableComponents/ErrorSnackbar/ErrorSnackbar";
import {ReusableButton} from "../../ReusableComponents/ReusableButton/ReusableButton";
import ReusableInput from "../../ReusableComponents/ReusableInput/ReusableInput";
import {PATH} from "../../Routes/Routes";
import {RequestStatusType, setAppErrorAC} from "../../../bll/reducers/appReducer";
import PaperContainer from "../../ReusableComponents/PaperContainer/PaperContainer";
import {registerTC} from "../../../bll/reducers/loginReducer";
import style from "../Login/Login.module.css";

export const Register = () => {

    const dispatch = useDispatch()
    const isRegister = useAppSelector<boolean>(state => state.Login.isRegister)
    const isLoading = useAppSelector<RequestStatusType>(state => state.App.status)

    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [submitted, setSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        setSubmitted(false);
    }
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
        setSubmitted(false);
    }
    const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.currentTarget.value)
        setSubmitted(false);
    }
    const handleSubmit = () => {
        if (password === confirmPassword) {
            dispatch(registerTC({email, password}))
            setSubmitted(true)
        } else {
            setError('Пароли не совпадают')
        }
    }
    useEffect(()=>{
        dispatch(setAppErrorAC(null))
        if(!isRegister){
            return
        }
    },[dispatch,isRegister])

    if (isRegister) {
        navigate(PATH.LOGIN_PAGE)
    }

    return (
        <PaperContainer title={'Registration'} >
            <ReusableInput value={email}
                           placeholder={'Email*'}
                           onChangeHandler={handleEmail} type={'email'}/>
            <ReusableInput value={password}
                           placeholder={'Password*'}
                           onChangeHandler={handlePassword}
                           type={'password'}
            />
            <ReusableInput value={confirmPassword}
                           placeholder={'Confirm password*'}
                           onChangeHandler={handleConfirmPassword}
                           type={'password'}
            />
            <ReusableButton title={'Register'}
                            onClickHandler={handleSubmit}
                            disabled={isLoading === 'loading'}
            />
            <NavLink to={PATH.LOGIN_PAGE} className={style.navLinkStyle}>Already registered?</NavLink>
            {!submitted ? <div className={styles.error}>{error}</div> : <ErrorSnackbar/>}
        </PaperContainer>
    );
};

