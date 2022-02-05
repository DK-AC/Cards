import React, {useState} from 'react';
import styles from './Register.module.css'

export const Register = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confPassword, setConfPassword] = useState<string>('')

    return (
        <div>
            <h1>Cards</h1>
            <h2>Sign Up</h2>
            <div className={styles.input}>
                <input type="text" placeholder={'Email*'}/>
            </div>
            <div className={styles.input}>
                <input type="password" placeholder={'Password*'}/>
            </div>
            <div className={styles.input}>
                <input type="password" placeholder={'Confirm password*'}/>
            </div>
            <button>Register</button>
        </div>
    );
};

