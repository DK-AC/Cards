import React, {ChangeEvent, useState} from 'react';
import styles from './Register.module.css'
import {useDispatch} from "react-redux";
import {LoadingType, registerTC} from "../../../bll/reducers/registerReducer";
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from "../../../bll/store";
import {ErrorSnackbar} from "../../ReusableComponents/ErrorSnackbar/ErrorSnackbar";
import ReusableInputEmail from "../../ReusableComponents/reusableInputEmail";
import {ReusableButton} from "../../ReusableComponents/ReusableButton/ReusableButton";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';

export const Register = () => {

    const dispatch = useDispatch()
    const isRegister = useAppSelector<boolean>(state => state.register.isRegister)
    const isLoading = useAppSelector<LoadingType>(state => state.register.isLoading)

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
            <Card className={styles.cards}>
                <CardContent>
                    <CardHeader title={'Cards'} className={styles.header}/>
                    <CardHeader title={'Sign Up'} className={styles.subheader}/>
                    <div >
                    <div>
                        <ReusableInputEmail value={email}
                                            placeholder={'Email*'}
                                            emailForgotHandler={handleEmail}
                        />
                    </div>
                    <div>
                        <ReusableInputEmail value={password}
                                            placeholder={'Password*'}
                                            emailForgotHandler={handlePassword}
                        />
                    </div>
                    <div>
                        <ReusableInputEmail value={confirmPassword}
                                            placeholder={'Confirm password*'}
                                            emailForgotHandler={handleConfirmPassword}
                        />
                    </div>
                    </div>
                    <ReusableButton title={'Register'}
                                    callback={handleSubmit}
                                    disabled={isLoading === 'loading'}
                    />
                    {!submitted ? <div className={styles.error}>{error}</div> : <ErrorSnackbar/>}
                    {isLoading === 'loading' && <LinearProgress/>}
                </CardContent>
            </Card>
        </div>
    );
};

