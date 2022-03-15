import s from '../Modal.module.css'
import {Button, Input, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {cardsFromUserForCreatingType} from "../../../../dal/cardsApi";

type AddCardType = {
    showAdd: (modal: boolean) => void
    addCard: (cardsData: cardsFromUserForCreatingType) => void
    cardsPack_id?: string
}

export const AddCard = ({showAdd, addCard,cardsPack_id}: AddCardType) => {


    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const onChangeQuestionHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const addNewCard = (): void => {
        let cardsData: cardsFromUserForCreatingType  ={
            answer: answer,
            question: question,
            cardsPack_id: cardsPack_id}
        addCard(cardsData);
    };
    return (
        <div className={s.containerModal}>
            <h1 className={s.titleModal}>Create new Card</h1>
            <div className={s.content}>
                <TextField id='question' label="Enter question for card" variant="standard"  onChange={onChangeQuestionHandler} value={question}/>
                <div className={s.margin}>
                    <TextField id='answer' label="Enter right answer" variant="standard"  onChange={onChangeAnswerHandler} value={answer}/>
                </div>
            </div>
            <div className={s.buttonContainer}>
                <Button onClick={addNewCard} color={"secondary"}>
                    add
                </Button>
                <Button onClick={() => showAdd(false)} color={"secondary"}>
                    cancel
                </Button>
            </div>
        </div>
    )
}