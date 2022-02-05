import React, {ChangeEvent, useState} from 'react';
import styles from './Register.module.css'

export const Register = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onChangeConfirmPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.currentTarget.value)
    }


    return (
        <div>
            <h1>Cards</h1>
            <h2>Sign Up</h2>
            <div className={styles.input}>
                <input type="text"
                       placeholder={'Email*'}
                       value={email}
                       onChange={onChangeEmailHandler}
                />
            </div>
            <div className={styles.input}>
                <input type="password"
                       placeholder={'Password*'}
                       value={password}
                       onChange={onChangePasswordHandler}
                />
            </div>
            <div className={styles.input}>
                <input type="password"
                       placeholder={'Confirm password*'}
                       value={confirmPassword}
                       onChange={onChangeConfirmPasswordHandler}
                />
            </div>
            <button>Register</button>
        </div>
    );
};

