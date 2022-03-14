import React from 'react';
import style from './LearningCard.module.css'
import Rating from "./Raiting/Rating";
import {CardType} from "../../bll/reducers/cardReducer";

type CardAnswerType = {
    currentCard: CardType
}

const CardAnswer = ({currentCard}: CardAnswerType) => {
    const re = /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi
    const answer = currentCard.answer && re.test(currentCard.answer)? <a target={'_blank'} href={currentCard.answer}>{currentCard.answer}</a> : currentCard.answer

    return (
        <div className={style.container}>
            <div>
                <h3 className={style.title}>Question:</h3>
                <p className={style.info}>{currentCard.question}</p>
            </div>
            <div>
                <h3 className={style.title}>Answer:</h3>
                <p className={style.info}>{answer}</p>
            </div>
            <Rating id={currentCard.cardsPack_id}/>
        </div>
    );
};

export default CardAnswer;