import {TextField} from '@mui/material';
import React, {ChangeEvent} from 'react';

type ReusableInputEmailType = {
    lable: string
    placeholder: string
    value: string
    emailForgotHandler: (value: ChangeEvent<HTMLInputElement>) => void
}

const ReusableInput = (props: ReusableInputEmailType) => {

    return (
        <>
            <TextField
                id="standard-basic"
                label={props.lable}
                variant="standard"
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.emailForgotHandler}
            />
        </>
    );
};

export default ReusableInput;
