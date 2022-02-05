import React, { ChangeEvent, useState } from 'react';
import ReusableInputEmail from '../../ReusableComponents/reusableInputEmail';


export const ForgotPass = () => {

    const [email, setEmail] = useState('')

    const emailForgotHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const sendEmailVerificationHandler = () => {
    }

    return (
        <div>
        <h3>Forgot password</h3>
            <label>Email</label>
            <div>
                <ReusableInputEmail
                    placeholder="Enter email"
                    emailForgotHandler={emailForgotHandler}
                />
            </div>
            <button onClick={sendEmailVerificationHandler}>
                Submit
            </button>
        </div>
    );
};

