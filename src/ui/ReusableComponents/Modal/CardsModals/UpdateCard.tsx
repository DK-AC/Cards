import s from '../Modal.module.css'
import {Button, Input, TextareaAutosize, TextField} from "@mui/material";
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
            <h1 className={s.titleModal}>Update Card</h1>
            <div className={s.content}>
                <TextField id='question' label="Enter question for card" variant="standard"  onChange={onChangeQuestionHandler} value={question}/>
                <div className={s.margin}>
                    <TextField id='answer' label="Enter right answer" variant="standard"  onChange={onChangeAnswerHandler} value={answer}/>
                </div>
            </div>
            <div className={s.buttonContainer}>
                <Button onClick={updateCardName} color={"secondary"}>
                update
            </Button>
                <Button onClick={() => showUpdate(false)} color={"secondary"}>
                    cancel
                </Button>
            </div>

        </div>
    )
}