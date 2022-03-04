import {TextField} from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import style from './ReusablePasswordInput.module.css'
import hidePass from '../../../assest/icons/hidePass.svg'

type ReusableInputEmailType = {
    label?: string
    placeholder?: string
    value: string
    onChangeHandler: (value: ChangeEvent<HTMLInputElement>) => void
}


const ReusablePasswordInput = React.memo(function ({label, placeholder, value, onChangeHandler}: ReusableInputEmailType) {

    const [reverseType, setReverseType] = useState<"password" | "text">("password");

    const onClickHandler = () => {
        if (reverseType === "password") {
            setReverseType("text");
        } else if (reverseType === "text") {
            setReverseType("password");
        }
    };

    return (
        <>
            <div className={style.wrapper}>
                <TextField
                    label={label}
                    variant="standard"
                    value={value}
                    placeholder={placeholder}
                    onChange={onChangeHandler}
                    className={style.ReusableInput}
                    type={reverseType}
                />
                <button type={"button"} className={style.visible} onClick={onClickHandler}>
                    <img src={hidePass} alt=""/>
                </button>
            </div>
        </>
    );
});

export default ReusablePasswordInput;
