import React, {ChangeEvent, useState} from 'react';
import { useDispatch } from 'react-redux';
import { setEmailForPasswordTC } from '../../../bll/reducers/forgotPassReducer';
import { emailValidator } from '../../../utilities/validatorApp';
import ReusableInputEmail from '../../ReusableComponents/reusableInputEmail';


export const ForgotPass = () => {

    const dispatch = useDispatch()

    const [password, setPassword] = useState('');


    const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const sendEmailVerificationHandler = () => {
        if (emailValidator(password)) {
            console.log('Wrong login type')
        } else {
            dispatch(setEmailForPasswordTC(password))
        }
    }

    return (
        <div>
            <h1>It-incubator</h1>
            <h3>Forgot your password?</h3>
            <div>
                <ReusableInputEmail
                    placeholder="Enter email"
                    value={password}
                    emailForgotHandler={handleSubmit}
                />
            </div>
            <div>
                <p>
                    Enter your email address and we will send you further instructions
                </p>
            </div>
            <button onClick={sendEmailVerificationHandler}>
                Submit
            </button>
        </div>
    );
};

