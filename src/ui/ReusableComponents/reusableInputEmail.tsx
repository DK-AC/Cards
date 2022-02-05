import { TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';

type ReusableInputEmailType = {
    placeholder: string
    emailForgotHandler: (value: ChangeEvent<HTMLInputElement>) => void
}

const ReusableInputEmail = (props: ReusableInputEmailType) => {

    return (
        <>
            <TextField
                id="standard-basic" 
                label="Standard"
                variant="standard"
                onChange={props.emailForgotHandler}
            />
        </>
    );
};

export default ReusableInputEmail;
