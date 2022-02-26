import React from 'react';
import style from './LearningCard.module.css'
import {Button} from "@mui/material";
import Rating from "./Raiting/Rating";
import {CardType} from "../../bll/reducers/cardReducer";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {ArrowBack} from "@mui/icons-material";
import {useAppSelector} from "../../bll/store";
import {RequestStatusType} from "../../bll/reducers/appReducer";

type CardAnswerType = {
    currentCard: CardType
    handleNext: (grade: number) => void
    setIsChecked: (isChecked: boolean) => void
}

const CardAnswer = ({currentCard, handleNext, setIsChecked}: CardAnswerType) => {

    const status = useAppSelector<RequestStatusType>(state => state.App.status)
    const grade = useAppSelector<number>(state => state.Cards.grade)

    const handlerClickBack = () => {
        setIsChecked(false)
    }
    const handlerClickNextQuestion = () => {
        handleNext(grade)
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
                <Button variant="outlined"
                        color={'inherit'}
                        size={"small"}
                        disabled={status === 'loading'}
                        startIcon={<ArrowBack/>}
                        onClick={handlerClickBack}>
                    Back
                </Button>
                <Button variant="outlined"
                        color={'success'}
                        size={"small"}
                        disabled={status === 'loading'}
                        startIcon={<ArrowForwardIcon/>}
                        onClick={handlerClickNextQuestion}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default CardAnswer;