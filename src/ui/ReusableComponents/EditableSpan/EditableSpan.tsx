import React, { ChangeEvent, useState } from 'react';
import {Input} from "@mui/material";
import style from "./EditableSpan.module.css";

type EditableSpanPropsType = {
    value: string
    onChange?: (newValue: string) => void
    placeholder: string
    myProfile?:boolean
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState<boolean>(false);
    let [value, setValue] = useState<string>(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        props.onChange && props.onChange(value);
        setValue(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
    }
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
       setValue(e.currentTarget.value)
    }

    return <div className={style.info}>
        <div className={style.textPlaceholder}>{props.placeholder}:</div>
        {props.myProfile && editMode
        ?  <Input type={props.placeholder}
                  value={value}
                  onChange={changeHandler}
                  placeholder= {props.placeholder}
                  autoFocus onBlur={activateViewMode}
                  readOnly={!props.onChange}
        />
            : <div onDoubleClick={activateEditMode} className={style.text}> {value}</div>}
    </div>
});
