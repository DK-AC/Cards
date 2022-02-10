import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {emailValidator} from '../../../utilities/validatorApp';
import ReusableInput from '../../ReusableComponents/ReusableInput/ReusableInput';
import {useAppSelector} from "../../../bll/store";
import PaperContainer from "../../ReusableComponents/PaperContainer/PaperContainer";
import {ReusableButton} from "../../ReusableComponents/ReusableButton/ReusableButton";
import {RequestStatusType} from "../../../bll/reducers/appReducer";
import {setEmailForPasswordTC} from "../../../bll/reducers/loginReducer";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../1-Routes/Routes";


export const PasswordRecovery = () => {
   /*
    const emailIsBeSended = useSelector<AppRootStateType,boolean>(store => store.login.emailIsBeSend)
    const error= useSelector<AppRootStateType,string>(store => store.app.error)
    const status = useSelector<AppRootStateType, RequestStatusType>(store=> store.app.status)

    const [email,setEmail]= useState<string>('')
    const onChangeEmailHandler:ChangeEventHandler<HTMLInputElement>=(e)=>{
        setEmail(e.currentTarget.value)
        dispatch(setAppErrorAC(''))
    }
    const onClickHandler=()=>{
        dispatch(setEmailForPasswordRecoveryTC(email, 'maya-mno@yandex.ru'))

    }
    if(emailIsBeSended){
        return <Navigate to= {PATH.CHECK_EMAIL_PAGE} />
    }*/

    const dispatch = useDispatch()
    const navigate = useNavigate()
    /*const state = useAppSelector<passwordRecoveryInitialStateType>(state => state.passwordRecovery)*/
    const isRequestSucceeded = useAppSelector<boolean>(store => store.Login.isRequestSucceeded)
    const status = useAppSelector<RequestStatusType>(store=> store.App.status)

    const [email,setEmail]= useState<string>('')

    const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        /*dispatch(setPasswordRecoveryAC(e.currentTarget.value))*/
    }

    const sendEmailVerificationHandler = () => {
        if (emailValidator(email)) {
            console.log('Wrong login type')
        } else {
            dispatch(setEmailForPasswordTC(email))
        }
    }

    if(isRequestSucceeded){
        navigate(PATH.CHECK_EMAIL_PAGE)
    }

    return (
        <PaperContainer title={'Forgot your password?'}>
            <ReusableInput label={'Email'}
                           placeholder={"Enter email"}
                           value={email}
                           onChangeHandler={handleSubmit}/>
            <p>Enter your email address and we will send you further instructions </p>
            <ReusableButton title={'Submit'} onClickHandler={sendEmailVerificationHandler}/>
        </PaperContainer>
    );
};

