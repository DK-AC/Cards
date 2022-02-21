import s from '../Modal.module.css'
import {Button, Input, TextareaAutosize} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {CardFromServerType, cardsFromUserForCreatingType} from "../../../../dal/cardsApi";

type UpdateCardType = {
    showUpdate: (modal: boolean) => void
    updateCard: (card: CardFromServerType) => void
    answer?: string
    question?: string
}

export const UpdateCard = ({showUpdate, updateCard, ...props}: UpdateCardType) => {

    const [question, setQuestion] = useState(props.question)
    const [answer, setAnswer] = useState(props.answer)
    const onChangeQuestionHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const updateCardName = (): void => {
        let cardsData: cardsFromUserForCreatingType = {
            answer: answer,
            question: question
        }
        updateCard(cardsData);
    };

    return (
        <div className={s.containerModal}>
            <h1 className={s.titleModal}>Update Pack</h1>
            <div>
                <Input type={'question'}
                       value={question}
                       onChange={onChangeQuestionHandler}
                       placeholder="enter question for card"/>
                <br/>
                <Input type={'answer'}
                       value={answer}
                       onChange={onChangeAnswerHandler}
                       placeholder="enter right answer"/>
            </div>
            <Button onClick={updateCardName} className={s.buttonLRMargin}>
                update
            </Button>
            <Button onClick={() => showUpdate(false)} className={s.buttonLRMargin}>
                cancel
            </Button>

        </div>
    )
}