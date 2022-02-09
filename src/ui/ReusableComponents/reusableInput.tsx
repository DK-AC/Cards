import { TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';

type ReusableInputEmailType = {
    label: string
    placeholder: string
    value: string
    isSucceeded?: boolean
    onClick: (value: ChangeEvent<HTMLInputElement>) => void
}

const ReusableInput = (props: ReusableInputEmailType) => {

    return (
        <>
            <TextField
                id="standard-basic"
                label={props.label}
                variant="standard"
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onClick}
            />
        </>
    );
};

export default ReusableInput;
