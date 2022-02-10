import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";

export type propsType ={
    title: string,
    checked: boolean,
    onChange:(e: ChangeEvent<HTMLInputElement>)=>void
}

const ReusableCheckbox = ( {title, checked, onChange, ...restProps}: propsType) => {
    return (
        <div>
            <label >
            <Checkbox
                onChange={onChange}
                defaultChecked {...restProps}
                aria-label={title}
            />
                {title}
            </label>
        </div>
    );
};

export default ReusableCheckbox;