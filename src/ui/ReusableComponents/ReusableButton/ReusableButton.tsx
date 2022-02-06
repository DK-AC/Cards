import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

type ReusableButtonType = {
    title: string
    callback: () => void
}

export const ReusableButton = ({title, callback}: ReusableButtonType) => {
    return (
        <Stack>
            <Button style={{marginTop: '10px'}} variant="outlined" onClick={callback}>{title}</Button>
        </Stack>
    );
}