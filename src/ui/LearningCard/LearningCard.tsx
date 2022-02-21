import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import PaperContainer from "../ReusableComponents/PaperContainer/PaperContainer";
import {useAppSelector} from "../../bll/store";
import {CardType} from "../../bll/reducers/cardReducer";
import {PackType} from "../../bll/reducers/packReducer";
import CardQuestion from "./CardQuestion";
import {useDispatch} from "react-redux";
import style from './LearningCard.module.css'
import {Button} from "@mui/material";

const LearningCard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams<{ id: string }>()
    const [answerSent, setAnswerSent] = useState<boolean>(false) //был ответ?
    const cards = useAppSelector<Array<CardType>>(state => state.Cards.cards)
    const packs = useAppSelector<Array<PackType>>(state => state.Packs.cardPacks)
    let pack: PackType | undefined
    const card = cards.find(card => card._id === id)
    if (card) {
        pack = packs.find(pack => pack._id === card.cardsPack_id)
    }
    useEffect(() => {

    }, [])
    const onClickHandler = (answerSent: boolean) => {
        setAnswerSent(answerSent)
    }

    let cardQuestion = card ? card.question : 'some card'
    let packName = pack ? pack.name : 'some pack'

    const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
    }
    const handlerClickNextQuestion = () => {
        console.log('next question')
    }
    const handlerClickBack = () => {
        navigate(-1)
    }


    return (
        <PaperContainer title={`Learn pack "${packName}"`}>

            {!answerSent
                ? <CardQuestion question={cardQuestion} onClickHandler={onClickHandler}/>
                : <div className={style.wrapper}>
                    <span>Rate yourself:</span>
                    <ul>
                        <li className={style.rateItem}>
                            <label>
                                <input value={1} onChange={onRadioChange} name={'rate'} type="radio"/>
                                Did not know
                            </label>
                        </li>
                        <li className={style.rateItem}>
                            <label>
                                <input value={2} onChange={onRadioChange} name={'rate'} type="radio"/>
                                Forgot
                            </label>
                        </li>
                        <li className={style.rateItem}>
                            <label>
                                <input value={3} onChange={onRadioChange} name={'rate'} type="radio"/>
                                A lot of thought
                            </label>
                        </li>
                        <li className={style.rateItem}>
                            <label>
                                <input value={4} onChange={onRadioChange} name={'rate'} type="radio"/>
                                Confused
                            </label>
                        </li>
                        <li className={style.rateItem}>
                            <label>
                                <input value={5} onChange={onRadioChange} name={'rate'} type="radio"/>
                                Knew the answer
                            </label>
                        </li>
                    </ul>
                    <Button variant="contained" onClick={handlerClickBack}>Back up</Button>
                    <Button variant="contained" onClick={handlerClickNextQuestion}>Next</Button>
                </div>}
        </PaperContainer>

    );
};

export default LearningCard;