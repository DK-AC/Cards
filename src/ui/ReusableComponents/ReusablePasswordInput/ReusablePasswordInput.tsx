import {TextField} from '@mui/material';
import React, {ChangeEvent, MouseEventHandler, useState} from 'react';
import style from './ReusablePasswordInput.module.css'
import hidePass from '../../../assets/icons/hidePass.svg'
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

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
    const handleMouseDownPassword: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
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
                    <IconButton
                        onClick={onClickHandler}
                        onMouseDown={handleMouseDownPassword}
                        edge="end">
                        {reverseType=== "password"? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </button>
            </div>
        </>
    );
});

export default ReusablePasswordInput;
