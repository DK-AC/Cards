import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


type ReusableButtonType = {
    title: string
    onClickHandler: () => void
    disabled?: boolean
}

export const ReusableButton = ({title, onClickHandler,disabled}: ReusableButtonType) => {
    return (
        <Stack>
            <Button variant="contained"
                    onClick={onClickHandler}
                    disabled={disabled}>
                {title}
            </Button>
        </Stack>
    );
}
