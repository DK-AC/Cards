import React, {ChangeEvent, useState} from 'react';
import styles from './Register.module.css'
import {useDispatch} from "react-redux";
import {registerTC} from "../../../bll/reducers/registerReducer";
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from "../../../bll/store";

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
            <div className={styles.input}>
                <input type="text"
                       placeholder={'Email*'}
                       value={email}
                       onChange={handleEmail}
                />
            </div>
            <div className={styles.input}>
                <input type="password"
                       placeholder={'Password*'}
                       value={password}
                       onChange={handlePassword}
                />
            </div>
            <div className={styles.input}>
                <input type="password"
                       placeholder={'Confirm password*'}
                       value={confirmPassword}
                       onChange={handleConfirmPassword}
                />
            </div>
            <button onClick={handleSubmit}>Register</button>
            <div className={styles.error}>{error}</div>
            {submitted && <div className={styles.successful}>Регистрация прошла успешно </div>}
        </div>
    );
};

