import React from 'react';
import style from './LearningCard.module.css'
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Raiting from "./Raiting/Raiting";
import {CardType} from "../../bll/reducers/cardReducer";

type CardAnswerType={
    card:CardType
}

const CardAnswer = ({ card, ...props }:  CardAnswerType) => {
    const navigate = useNavigate()
    const handlerClickBack =()=>{
        navigate(-1)
    }
    const handlerClickNextQuestion = () => {
        console.log('next question')
    }

    const id= card? card._id as string : '111'
    return (
        <div className={style.container}>
            <div className={style.block}>
                <h3 className={style.title}>Question:</h3>
                <p className={style.info}>{card.question}</p>
            </div>
            <div className={style.block}>
                <h3 className={style.title}>Answer:</h3>
                <p className={style.info}>{card.answer}</p>
            </div>
          <Raiting id={id}/>
            <div className={style.buttonMenu}>
            <Button variant="contained" onClick={handlerClickBack}>Back up</Button>
            <Button variant="contained" color={"success"} onClick={handlerClickNextQuestion}>Next</Button>
            </div>
        </div>
    );
};

export default CardAnswer;