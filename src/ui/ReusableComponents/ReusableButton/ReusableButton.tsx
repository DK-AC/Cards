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
            <Button variant="contained"
                    onClick={callback}
                    style={{marginTop: '90px', backgroundColor: '#21268F'}}
            >
                {title}
            </Button>
        </Stack>
    );
}
