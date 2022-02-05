import React, { ChangeEvent, useState } from 'react';


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
                <input
                    type="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={emailForgotHandler}
                />
            </div>
            <button onClick={sendEmailVerificationHandler}>
                Submit
            </button>
        </div>
    );
};

