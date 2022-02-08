import React from 'react';
import {useAppSelector} from "../../../bll/store";

const SendConfirmEmail = () => {

    const email = useAppSelector<string>(state => state.passwordRecovery.email)

    return (
        <>
            <h1>It-incubator</h1>
            <h2>Check Email</h2>
           <p>We've sent an Email with instructions to {email}
           </p>
        </>
    );
};

export default SendConfirmEmail;