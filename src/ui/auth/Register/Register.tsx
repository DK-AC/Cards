import React, {ChangeEvent, useState} from 'react';
import styles from './Register.module.css'
import {useDispatch} from "react-redux";
import { registerTC} from "../../../bll/reducers/registerReducer";
import {NavLink, useNavigate} from 'react-router-dom';
import {useAppSelector} from "../../../bll/store";
import {ErrorSnackbar} from "../../ReusableComponents/ErrorSnackbar/ErrorSnackbar";
import {ReusableButton} from "../../ReusableComponents/ReusableButton/ReusableButton";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';
import {typeForInput, TypeForInputType} from "../../../shared";
import {SuperInputText} from "../../ReusableComponents/SuperInputText";
import {RequestStatusType} from "../../../bll/reducers/appReducer";

export const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isRegister = useAppSelector<boolean>(state => state.register.isRegister)
    const isLoading = useAppSelector<RequestStatusType>(state => state.app.status)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const [inputPasswordType, setInputPasswordType] = useState<TypeForInputType>(typeForInput.Password)
    const [inputConfirmPasswordType, setInputConfirmPasswordType] = useState<TypeForInputType>(typeForInput.Password)

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
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
    const changeInputPasswordType = () => {
        setInputPasswordType(
            inputPasswordType === typeForInput.Password ? typeForInput.Text : typeForInput.Password
        )
    }
    const changeInputConfirmPasswordType = () => {
        setInputConfirmPasswordType(
            inputConfirmPasswordType === typeForInput.Password ? typeForInput.Text : typeForInput.Password
        )
    }

    if (isRegister) {
        navigate('/login')
    }

    return (
        <div>
            <Card>
                <CardContent>
                    <CardHeader title={'Cards'} className={styles.header}/>
                    <CardHeader title={'Sign Up'} className={styles.subheader}/>
                    <div>
                        <div>
                            <SuperInputText value={email}
                                            placeholder={typeForInput.Email}
                                            onChange={handleEmail}
                            />
                        </div>
                        <div className={styles.group}>
                            <SuperInputText value={password}
                                            onChange={handlePassword}
                                            placeholder={typeForInput.Password}
                                            inputType={inputPasswordType}/>
                            <span
                                onClick={changeInputPasswordType}
                                className={styles.eye}
                            >&#128065;
                    </span>
                        </div>
                        <div className={styles.group}>
                            <SuperInputText value={confirmPassword}
                                            onChange={handleConfirmPassword}
                                            placeholder={'confirm password'}
                                            inputType={inputConfirmPasswordType}/>
                            <span
                                onClick={changeInputConfirmPasswordType}
                                className={styles.eye}
                            >&#128065;
                            </span>
                        </div>
                    </div>
                    <ReusableButton title={'Register'}
                                    callback={handleSubmit}
                                    disabled={isLoading === 'loading'}
                    />
                    {!submitted ? <div className={styles.error}>{error}</div> : <ErrorSnackbar/>}
                    {isLoading === 'loading' && <LinearProgress/>}
                    <NavLink className={styles.singIn} to={`/login`}>Back to Sing In</NavLink>
                </CardContent>
            </Card>
        </div>
    );
};

