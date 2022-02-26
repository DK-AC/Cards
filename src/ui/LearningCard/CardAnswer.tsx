import React from 'react';
import style from './LearningCard.module.css'
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Rating from "./Raiting/Rating";
import {CardType} from "../../bll/reducers/cardReducer";

type CardAnswerType = {
    currentCard: CardType
    nextCardHandler: (grade: number) => void
    setIsChecked: (isChecked: boolean) => void
}

const CardAnswer = ({currentCard, nextCardHandler, setIsChecked}: CardAnswerType) => {

    const navigate = useNavigate()

    const handlerClickBack = () => {
        setIsChecked(false)
    }
    const handlerClickNextQuestion = () => {
        nextCardHandler(1)
    }

    return (
        <div className={style.container}>
            <div className={style.block}>
                <h3 className={style.title}>Question:</h3>
                <p className={style.info}>{currentCard.question}</p>
            </div>
            <div className={style.block}>
                <h3 className={style.title}>Answer:</h3>
                <p className={style.info}>{currentCard.answer}</p>
            </div>
            <Rating id={currentCard.cardsPack_id}/>
            <div className={style.buttonMenu}>
                <Button variant="contained" onClick={handlerClickBack}>Back up</Button>
                <Button variant="contained" color={"success"} onClick={handlerClickNextQuestion}>Next</Button>
            </div>
        </div>
    );
};

export default CardAnswer;