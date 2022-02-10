import React, {ChangeEvent, useState} from 'react';
import styles from './Register.module.css'
import {useDispatch} from "react-redux";
import {LoadingType, registerTC} from "../../../bll/reducers/registerReducer";
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from "../../../bll/store";
import {ErrorSnackbar} from "../../ReusableComponents/ErrorSnackbar/ErrorSnackbar";
import {ReusableButton} from "../../ReusableComponents/ReusableButton/ReusableButton";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';
import ReusableInput from "../../ReusableComponents/ReusableInput/ReusableInput";
import {PATH} from "../../1-Routes/Routes";
import {RequestStatusType} from "../../../bll/reducers/appReducer";
import PaperContainer from "../../ReusableComponents/PaperContainer/PaperContainer";

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

    if (isRegister) {
        navigate(PATH.LOGIN_PAGE)
    }

    return (
        <PaperContainer title={'Registration'} >
            <ReusableInput value={email}
                           placeholder={'Email*'}
                           onChangeHandler={handleEmail}/>
            <ReusableInput value={password}
                           placeholder={'Password*'}
                           onChangeHandler={handlePassword}
            />
            <ReusableInput value={confirmPassword}
                           placeholder={'Confirm password*'}
                           onChangeHandler={handleConfirmPassword}
            />
            <ReusableButton title={'Register'}
                            onClickHandler={handleSubmit}
                            disabled={isLoading === 'loading'}
            />
            {!submitted ? <div className={styles.error}>{error}</div> : <ErrorSnackbar/>}
            {isLoading === 'loading' && <LinearProgress/>}
        </PaperContainer>
    );
};

