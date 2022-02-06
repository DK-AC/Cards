import React, {ChangeEvent, useState} from 'react';
import styles from './Register.module.css'
import {useDispatch} from "react-redux";
import {registerTC} from "../../../bll/reducers/registerReducer";
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from "../../../bll/store";
import {ErrorSnackbar} from "../../ReusableComponents/ErrorSnackbar/ErrorSnackbar";
import ReusableInputEmail from "../../ReusableComponents/reusableInputEmail";
import {ReusableButton} from "../../ReusableComponents/ReusableButton/ReusableButton";

export const Register = () => {

    const dispatch = useDispatch()
    const isRegister = useAppSelector<boolean>(state => state.register.isRegister)

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
        navigate('/login')
    }

    return (
        <div className={styles.container}>
            <h1>Cards</h1>
            <h2>Sign Up</h2>
            <ReusableInputEmail value={email}
                                placeholder={'Email*'}
                                emailForgotHandler={handleEmail}
            />
            <ReusableInputEmail value={password}
                                placeholder={'Password*'}
                                emailForgotHandler={handlePassword}
            />
            <ReusableInputEmail value={confirmPassword}
                                placeholder={'Confirm password*'}
                                emailForgotHandler={handleConfirmPassword}
            />
            <ReusableButton title={'Register'} callback={handleSubmit}/>
            {!submitted ? <div className={styles.error}>{error}</div> : <ErrorSnackbar/>}
        </div>
    );
};

