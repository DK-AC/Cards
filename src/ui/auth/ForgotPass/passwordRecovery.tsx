import React, {ChangeEvent, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
    isPasswordRecoverySucceededAC,
    passwordRecoveryInitialStateType,
    setEmailForPasswordTC, setErrorMessageAC,
    setPasswordRecoveryAC
} from '../../../bll/reducers/passwordRecoveryReducer';
import {emailValidator} from '../../../utilities/validatorApp';
import ReusableInput from '../../ReusableComponents/reusableInput';
import {useAppSelector} from "../../../bll/store";
import {useNavigate} from "react-router-dom";
import SendConfirmEmail from "./SendConfirmEmail";

export const PasswordRecovery = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const state = useAppSelector<passwordRecoveryInitialStateType>(state => state.passwordRecovery)
    const isSucceeded = useAppSelector<boolean>(state => state.passwordRecovery.isRequestSucceeded)
    const errorMessage = useAppSelector<string>(state => state.passwordRecovery.errorMessage)
    const email = useAppSelector<string>(state => state.passwordRecovery.email)


    useEffect(() => {
        return () => {
            //dispatch(setPasswordRecoveryAC(''))
            dispatch(isPasswordRecoverySucceededAC(false))
            dispatch(setErrorMessageAC(""))
        }
    }, [])

    useEffect(() => {
        if (isSucceeded) {
            navigate("/confirm")
        }
    }, [isSucceeded])

    const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setPasswordRecoveryAC(e.currentTarget.value))
    }

    const sendEmailVerificationHandler = () => {
        if (emailValidator(email) || email.length === 0) {
            dispatch(setErrorMessageAC('Email address is not valid'))
        } else {
            dispatch(setEmailForPasswordTC(state))
        }
    }

    return (
        <div>
            <h1>It-incubator</h1>
            <h3>Forgot your password?</h3>
            <div>
                {!isSucceeded && errorMessage}
                <div>
                    <ReusableInput
                        isSucceeded={isSucceeded}
                        label={'Email'}
                        placeholder={"Enter email"}
                        value={email}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
            <div>
                <p>
                    Enter your email address and we will send you further instructions
                </p>
            </div>
            <button onClick={sendEmailVerificationHandler}>Submit</button>
        </div>
    );
};

