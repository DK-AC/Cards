import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import PaperContainer from "../ReusableComponents/PaperContainer/PaperContainer";
import {useAppSelector} from "../../bll/store";
import {CardType} from "../../bll/reducers/cardReducer";
import {PackType} from "../../bll/reducers/packReducer";
import CardQuestion from "./CardQuestion";
import CardAnswer from "./CardAnswer";

const LearningCard = () => {
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

    let cardProp = card ? card : {} as CardType
    let packName = pack ? pack.name : 'some pack'

    return (
        <PaperContainer title={`Learn pack "${packName}"`} isCard={true}>
            {!answerSent
                ? <CardQuestion card={cardProp} onClickHandler={onClickHandler}/>
                : <CardAnswer  card={cardProp} />}
        </PaperContainer>

    );
};

export default LearningCard;