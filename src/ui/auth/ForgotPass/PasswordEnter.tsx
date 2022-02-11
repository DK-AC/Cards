import React, {ChangeEventHandler, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../bll/store";
import {RequestStatusType, setAppErrorAC} from "../../../bll/reducers/appReducer";
import {setNewPasswordTC} from "../../../bll/reducers/loginReducer";
import {PATH} from "../../Routes/Routes";
import PaperContainer from "../../ReusableComponents/PaperContainer/PaperContainer";
import {ErrorSnackbar} from "../../ReusableComponents/ErrorSnackbar/ErrorSnackbar";
import ReusableInput from "../../ReusableComponents/ReusableInput/ReusableInput";
import {ReusableButton} from "../../ReusableComponents/ReusableButton/ReusableButton";

const PasswordEnter = () => {
    const {token} = useParams<string>()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isRequestSucceeded = useAppSelector<boolean>(state => state.Login.isRequestSucceeded)
    const error = useAppSelector<string | null>(state => state.App.error)
    const status = useAppSelector<RequestStatusType>(stare => stare.App.status)

    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const handlePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.currentTarget.value)
        dispatch(setAppErrorAC(null))
    }
    const handlePassword2: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword2(e.currentTarget.value)
        dispatch(setAppErrorAC(null))
    }

    const handleSubmit = () => {
        if (password === password2) {
            token ?
                dispatch(setNewPasswordTC({password, resetPasswordToken: token}))
                : dispatch(setAppErrorAC('missing token'))
        } else {
            dispatch(setAppErrorAC('Passwords is different'))
        }
    }

    if (isRequestSucceeded) {
        navigate(PATH.LOGIN_PAGE)
    }
    return (
        <PaperContainer title={'Create new password'}>
            <ReusableInput value={password}
                           placeholder={'Password*'}
                           onChangeHandler={handlePassword}
            />
            <ReusableInput value={password2}
                           placeholder={'Confirm Password*'}
                           onChangeHandler={handlePassword2}
            />
            <ReusableButton title={'Update Password'}
                            onClickHandler={handleSubmit}
                            disabled={status === 'loading' || !!error}
            />

            {error && <ErrorSnackbar/>}
        </PaperContainer>
    );
};

export default PasswordEnter;