import React, {ChangeEventHandler, useCallback, useEffect, useState} from 'react';
import style from './Login.module.css'
import {useDispatch} from "react-redux";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../bll/store";
import {RequestStatusType, setAppErrorAC} from "../../../bll/reducers/appReducer";
import {loginTC} from "../../../bll/reducers/loginReducer";
import PaperContainer from "../../ReusableComponents/PaperContainer/PaperContainer";
import ReusableInput from "../../ReusableComponents/ReusableInput/ReusableInput";
import {ReusableButton} from "../../ReusableComponents/ReusableButton/ReusableButton";
import {PATH} from "../../Routes/Routes";
import ReusableCheckbox from "../../ReusableComponents/ReusableCheckBox/ReusableCheckbox";
import {ErrorSnackbar} from "../../ReusableComponents/ErrorSnackbar/ErrorSnackbar";
import {restoreState, saveState} from "../../../dal/localStorage/localStorage";
import ReusablePasswordInput from '../../ReusableComponents/ReusablePasswordInput/ReusablePasswordInput';


export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    // @ts-ignore
    const fromPage = location.state?.from?.pathname || PATH.PROFILE_PAGE

    const isLoggedIn = restoreState('isLogged', false)
    const error = useAppSelector<string | null>(state => state.App.error)
    const status = useAppSelector<RequestStatusType>(state => state.App.status)


    const [email, setEmail] = useState<string>('dyatlovivan92@gmail.com')
    const [password, setPassword] = useState<string>('12345678')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const handleEmail: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setEmail(e.currentTarget.value)
    }, [setEmail])
    const handlePassword: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setPassword(e.currentTarget.value)
    }, [setPassword])
    const handleRememberMe: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setRememberMe(e.target.checked)
    }, [setRememberMe])
    const singInHandler = useCallback(() => {
        dispatch(loginTC({email, password, rememberMe}))
        saveState('isLogged', true)
    }, [loginTC, dispatch, email, password, rememberMe])


    useEffect(() => {
        dispatch(setAppErrorAC(null))
        if (isLoggedIn) {
            fromPage === null || '/' ? navigate(PATH.PROFILE_PAGE) : navigate(-1)
        } else {
            return
        }
    }, [isLoggedIn])

    if (error === 'you are not authorized /???-???-???\\') {
        dispatch(setAppErrorAC(null))
    }


    return (
        <PaperContainer title={'Sign in'}>
            <ReusableInput value={email}
                           placeholder={'Email*'}
                           onChangeHandler={handleEmail}
                           type={'email'}
            />
            <ReusablePasswordInput value={password}
                                   placeholder={'Password*'}
                                   onChangeHandler={handlePassword}
            />
            <ReusableCheckbox title={'remember me'} checked={rememberMe}
                              onChange={handleRememberMe}
            />
            <NavLink className={style.navLinkStyle} to={PATH.FORGOT_PAGE}>
                <span>forgot password?</span></NavLink>

            <ReusableButton title={'Login'}
                            onClickHandler={singInHandler}
                            disabled={status === 'loading'}
            />
            <p>Don't have an account?</p>
            <NavLink className={`${style.navLinkStyle} ${style.SignUp}`} to={PATH.REGISTRATION_PAGE}>Sing Up</NavLink>
            {error && <ErrorSnackbar/>}
        </PaperContainer>)
}