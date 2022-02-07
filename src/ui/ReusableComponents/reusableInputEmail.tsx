import { TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';

type ReusableInputEmailType = {
    placeholder: string
    value: string
    emailForgotHandler: (value: ChangeEvent<HTMLInputElement>) => void
}

const ReusableInputEmail = (props: ReusableInputEmailType) => {

    return (
        <>
            <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.emailForgotHandler}
                style={{width:'150%'}}
            />
        </>
    );
};

export default ReusableInputEmail;
