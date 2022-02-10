import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';
import style from './Login.module.css'
import {useDispatch} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../bll/store";
import {RequestStatusType, setAppErrorAC} from "../../../bll/reducers/appReducer";
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {typeForInput, TypeForInputType} from "../../../shared";
import {SuperInputText} from "../../ReusableComponents/SuperInputText";
import {loginTC} from "../../../bll/reducers/loginReducer";
import PaperContainer from "../../ReusableComponents/PaperContainer/PaperContainer";
import ReusableInput from "../../ReusableComponents/ReusableInput/ReusableInput";
import {ReusableButton} from "../../ReusableComponents/ReusableButton/ReusableButton";
import {PATH} from "../../1-Routes/Routes";
import ReusableCheckbox from "../../ReusableComponents/ReusableCheckBox/ReusableCheckbox";

export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.Login.isLogged)
    const error = useAppSelector<string | null>(state => state.App.error)
    const status = useAppSelector<RequestStatusType>(state => state.App.status)

    const [email, setEmail] = useState<string>('dyatlovivan92@gmail.com')
    const [password, setPassword] = useState<string>('12345678')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const [inputType, setInputType] = useState<TypeForInputType>(typeForInput.Password)
    const disabled = status === 'loading';

    const handleEmail:ChangeEventHandler<HTMLInputElement>=(e)=>{
        setEmail(e.currentTarget.value)
    }
    const handlePassword:ChangeEventHandler<HTMLInputElement>=(e)=>{
        setPassword(e.currentTarget.value)
    }
    const handleRememberMe:ChangeEventHandler<HTMLInputElement>  =(e)=>{
        setRememberMe(e.target.checked)

    }
    const singInHandler = () => {
        dispatch(loginTC({email, password, rememberMe}))
    }
    const changeInputType = () => {
        setInputType(
            inputType === typeForInput.Password ? typeForInput.Text : typeForInput.Password
        )
    }

 /* useEffect(() => {
        if (isLoggedIn) {
            navigate('/profile')
        }
    }, [isLoggedIn])*/


    useEffect(() => {
     dispatch(setAppErrorAC(null))
        if (isLoggedIn) {
            navigate(PATH.PROFILE_PAGE)
        }else{
            navigate(PATH.LOGIN_PAGE)
        }
    }, [isLoggedIn])

    return (
        <PaperContainer title={'Sign in'} >
            <ReusableInput value={email}
                           placeholder={'Email*'}
                           onChangeHandler={handleEmail}/>
            <ReusableInput value={password}
                           placeholder={'Password*'}
                           onChangeHandler={handlePassword}
            />
                <ReusableCheckbox title={'remember me'} checked={rememberMe}
                                  onChange={handleRememberMe}/>

                <NavLink className={style.navLinkStyle} to={PATH.FORGOT_PAGE}>
                    <span>forgot password?</span></NavLink>

            <ReusableButton title={'Login'}
                            onClickHandler={singInHandler}
                            disabled={status === 'loading'}
            />
             <p>Don't have an account?</p>
            <NavLink  className={`${style.navLinkStyle} ${style.SignUp}`} to={PATH.REGISTRATION_PAGE}>Sing Up</NavLink>
            </PaperContainer>)}

{/*     /*  <div className={style.RegisterFormContainer}>
            <h1>Cards</h1>
            <h2>Sign in</h2>
            <div className={style.mainBlock}>
                {status === 'loading' && <span>{status}</span>}

                {error && <span className={style.error}>{error}</span>}
                <SuperInputText disabled={disabled}
                                value={email}
                                onChangeText={setEmail}
                                placeholder={typeForInput.Email}
                                inputType={typeForInput.Email}/>

                <div className={style.group}>
                    <SuperInputText disabled={disabled}
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder={typeForInput.Password}
                                    inputType={inputType}/>
                    <span
                        onClick={changeInputType}
                        className={style.eye}
                    >&#128065;
                    </span>
                </div>
                <div className={style.checkboxBlock}>
                    <Checkbox checked={rememberMe}
                              onChange={() => setRememberMe(!rememberMe)}
                              disabled={disabled}/>
                    <label>remember me</label>
                </div>
                <div className={style.forgotPasswordBlock}>
                    <NavLink style={{textDecoration: "none", color: "black"}} to={`/passwordRecovery`}>forgot
                        password?</NavLink>
                </div>

                <Button className={style.button}
                        disabled={disabled}
                        onClick={singInHandler}
                        value={'Login'}
                        variant="contained">
                    Login
                </Button>
            </div>
            <div className={style.singUpBlock}>
                <div style={{color: "grey"}}>
                    Don't have an account?
                </div>
                <div className={style.singUp}>
                    <NavLink style={{textDecoration: "none", color: "#21268F"}} to={`/register`}>Sing Up</NavLink>
                </div>
            </div>
        </div>*/

}
