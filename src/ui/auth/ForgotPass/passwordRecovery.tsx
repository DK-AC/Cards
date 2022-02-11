import React, {ChangeEvent, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {emailValidator} from '../../../utilities/validatorApp';
import ReusableInput from '../../ReusableComponents/ReusableInput/ReusableInput';
import {useAppSelector} from "../../../bll/store";
import PaperContainer from "../../ReusableComponents/PaperContainer/PaperContainer";
import {ReusableButton} from "../../ReusableComponents/ReusableButton/ReusableButton";
import {setAppErrorAC} from "../../../bll/reducers/appReducer";
import {setEmailForPasswordTC} from "../../../bll/reducers/loginReducer";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../Routes/Routes";


export const PasswordRecovery = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isRequestSucceeded = useAppSelector<boolean>(store => store.Login.isRequestSucceeded)

    const [email, setEmail] = useState<string>('')

    const handleSubmit = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    },[setEmail])
    const sendEmailVerificationHandler = useCallback(() => {
        if (emailValidator(email)) {
            dispatch(setAppErrorAC('Wrong login type'))
        } else {
            dispatch(setEmailForPasswordTC(email))}
    },[emailValidator, email, dispatch,setEmailForPasswordTC])

    if (isRequestSucceeded) {
        navigate(PATH.CHECK_EMAIL_PAGE)
    }

    return (
        <PaperContainer title={'Forgot your password?'}>
            <ReusableInput label={'Email'}
                           placeholder={"Enter email"}
                           value={email}
                           onChangeHandler={handleSubmit}
                           type={'email'}/>
            <p>Enter your email address and we will send you further instructions </p>
            <ReusableButton title={'Submit'} onClickHandler={sendEmailVerificationHandler}/>
        </PaperContainer>
    );
};

