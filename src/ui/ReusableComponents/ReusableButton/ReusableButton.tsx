import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

type ReusableButtonType = {
    title: string
    callback: () => void
    disabled: boolean
}

export const ReusableButton = ({title, callback,disabled}: ReusableButtonType) => {
    return (
        <Stack>
            <Button variant="contained"
                    onClick={callback}
                    style={{marginTop: '90px'}}
                    disabled={disabled}
            >
                {title}
            </Button>
        </Stack>
    );
}
