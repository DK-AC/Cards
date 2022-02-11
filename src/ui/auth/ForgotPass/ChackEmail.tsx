import React from 'react';
import {useAppSelector} from "../../../bll/store";
import PaperContainer from "../../ReusableComponents/PaperContainer/PaperContainer";
import emailIMG from '../../../assets/image/email.png';
import style from './ChackEmail.module.css'


const CheckEmail = () => {
    const email = useAppSelector<string>(store => store.Login.email)
    return (
        <PaperContainer title={'Check Email'}>
            <img src={emailIMG} alt={'Success'} className={style.img}/>
            <span>We've sent an Email with instructions to {email}</span>
        </PaperContainer>
    );
};

export default CheckEmail;

