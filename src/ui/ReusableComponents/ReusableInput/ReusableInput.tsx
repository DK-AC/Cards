import {TextField} from '@mui/material';
import React, {ChangeEvent} from 'react';
import style from './ReusableInput.module.css'

type ReusableInputEmailType = {
    label?: string
    placeholder?: string
    value: string
    onChangeHandler: (value: ChangeEvent<HTMLInputElement>) => void
    type?:string
}

const ReusableInput = ({label, placeholder, value, onChangeHandler, type}: ReusableInputEmailType) => {

    return (
        <>
            <TextField
                id="standard-basic"
                label={label}
                variant="standard"
                value={value}
                placeholder={placeholder}
                onChange={onChangeHandler}
                className={style.ReusableInput}
                type={type}
            />
        </>
    );
};

export default ReusableInput;
