import React from 'react';
import style from './LearningCard.module.css'
import {Button} from "@mui/material";
import {CardType} from "../../bll/reducers/cardReducer";
import {useNavigate} from "react-router-dom";
import {PATH} from '../Routes/Routes';

export type CardQuestionType = {
    currentCard: CardType
    setIsChecked: (isChecked: boolean) => void
}

const CardQuestion = ({currentCard, setIsChecked}: CardQuestionType) => {

    const navigate = useNavigate()

    const handlerClickBack = () => {
        navigate(PATH.PACKS_TABLE_PAGE)
    }
    const handlerClickAnswer = () => {
        setIsChecked(true)
    }

    return (
        <div className={style.container}>
            <div className={style.block}>
                <h3 className={style.title}>Question:</h3>
                <p className={style.question}>{currentCard.question}</p>
            </div>
            <div className={style.buttonMenu}>
                <Button variant="contained" onClick={handlerClickBack}>Back up</Button>
                <Button variant="contained" color={"success"}
                        onClick={handlerClickAnswer}>Answer</Button></div>
        </div>

    );
};

export default CardQuestion;