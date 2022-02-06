import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch} from 'react-redux';
import {setRegisterErrorAC} from "../../../bll/reducers/registerReducer";
import {useAppSelector} from "../../../bll/store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export function ErrorSnackbar() {

    const error = useAppSelector<null | string>(state => state.register.error)

    const dispatch = useDispatch();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setRegisterErrorAC(null))
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={() => handleClose()}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}
