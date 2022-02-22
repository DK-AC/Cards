import React from 'react';
import style from './LearningCard.module.css'
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Raiting from "./Raiting/Raiting";

type CardAnswerType={
    question?: string
    questionImg?: string
    questionVideo?: string
    answerImg?: string
    answerVideo?: string
    answer?: string
}

const CardAnswer = ({ question,answer, ...props }:  CardAnswerType) => {
    const navigate = useNavigate()
    const handlerClickBack =()=>{
        navigate(-1)
    }
    const handlerClickNextQuestion = () => {
        console.log('next question')
    }
    return (
        <div className={style.container}>
            <div className={style.block}>
                <h3 className={style.title}>Question:</h3>
                <p className={style.info}>{question}</p>
            </div>
            <div className={style.block}>
                <h3 className={style.title}>Answer:</h3>
                <p className={style.info}>{answer}</p>
            </div>
          <Raiting />
            <div className={style.buttonMenu}>
            <Button variant="contained" onClick={handlerClickBack}>Back up</Button>
            <Button variant="contained" color={"success"} onClick={handlerClickNextQuestion}>Next</Button>
            </div>
        </div>
    );
};

export default CardAnswer;