import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


type ReusableButtonType = {
    title: string
    onClickHandler: () => void
    disabled?: boolean
    size?:  "small" | "medium" | "large" | undefined
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
}

export const ReusableButton = React.memo(function ({title, onClickHandler,disabled,size, color,...props}: ReusableButtonType){
    return (
        <Stack>
            <Button variant={"contained"}
                    onClick={onClickHandler}
                    disabled={disabled}
                    size={size}
                    color={color? color: 'primary'}
                    {...props}>
                {title}
            </Button>
        </Stack>
    );
})
