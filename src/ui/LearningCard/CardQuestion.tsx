import React, {MouseEventHandler} from 'react';
import style from './LearningCard.module.css'
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export type CardQuestionType={
    question?: string
    questionImg?: string
    questionVideo?: string
    onClickHandler:(e:boolean)=>void
}

const CardQuestion = ({question, ...props}:CardQuestionType) => {

    const navigate = useNavigate()
    const handlerClickBack =()=>{
        navigate(-1)
    }
    const handlerClickAnswer:MouseEventHandler<HTMLButtonElement>=(e)=>{
        props.onClickHandler(true)
    }
    return (
        <div className={style.container}>
            <div className={style.block}>
                <h3 className={style.title}>Question:</h3>
                <p className={style.question}>{question}</p>
            </div>
            <div className={style.buttonMenu}>
                <Button variant="contained" onClick={handlerClickBack} >Back up</Button>
                <Button variant="contained" color={"success"} onClick={handlerClickAnswer}>Answer</Button></div>
        </div>

    );
};

export default CardQuestion;