import React from 'react';
import style from './LearningCard.module.css'
import {CardType} from "../../bll/reducers/cardReducer";


export type CardQuestionType = {
    currentCard: CardType
}

const CardQuestion = ({currentCard}: CardQuestionType) => {

    return (
        <div className={style.container}>
            <div className={style.block}>
                <h3 className={style.title}>Question:</h3>
                <p className={style.question}>{currentCard.question}</p>
            </div>
        </div>

    );
};

export default CardQuestion;