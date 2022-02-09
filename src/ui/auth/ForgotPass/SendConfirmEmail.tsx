import React from 'react';
import {useAppSelector} from "../../../bll/store";
import mail from "./mail.svg"

const SendConfirmEmail = () => {
    const email = useAppSelector<string>(state => state.passwordRecovery.email)
    return (
        <>
            <h1>It-incubator</h1>
            <h2>Check Email</h2>
            <img src={mail} alt="mail"/>
           <p>We've sent an Email with instructions to {email}
           </p>
        </>
    );
};

export default SendConfirmEmail;