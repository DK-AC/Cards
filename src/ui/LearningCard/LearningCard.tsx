import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import PaperContainer from "../ReusableComponents/PaperContainer/PaperContainer";
import {useAppSelector} from "../../bll/store";
import {CardType} from "../../bll/reducers/cardReducer";
import {PackType} from "../../bll/reducers/packReducer";
import CardQuestion from "./CardQuestion";
import CardAnswer from "./CardAnswer";


const getCard = (cards: CardType[]) => {
    // @ts-ignore
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            // @ts-ignore
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    return cards[res.id + 1];
}

const LearningCard = () => {
    const {id} = useParams<{ id: string }>()
    const [answerSent, setAnswerSent] = useState<boolean>(false) //был ответ?
    const cards = useAppSelector<Array<CardType>>(state => state.Cards.cards)
    const packs = useAppSelector<Array<PackType>>(state => state.Packs.cardPacks)
    const [currentCard, setCurrentCard] = useState<CardType>({})
    const [first, setFirst] = useState<boolean>(true);
    const navigate = useNavigate()

    let pack: PackType | undefined
    const card = cards.find(card => card._id === id)

    if (card) {
        pack = packs.find(pack => pack._id === card.cardsPack_id)
    }

    const onClickHandler = useCallback((answerSent: boolean) => {
        setAnswerSent(answerSent)
        if (cards.length > 0) {
            setCurrentCard(getCard(cards));
        }
    }, [answerSent])

    const handlerClickBack = () => {
        pack && navigate(`/cards/${pack._id}`)
    }

    useEffect(() => {
        setFirst(false);
        setAnswerSent(false)
    }, [id, cards, first])

    let cardProp = card ? card : {} as CardType
    let packName = pack ? pack.name : 'some pack'

    return (
        <PaperContainer title={`Learn pack "${packName}"`} isCard={true}>
            {!answerSent
                ? <CardQuestion card={cardProp} onClickHandler={onClickHandler} handlerClickBack={handlerClickBack}/>
                : <CardAnswer card={cardProp} nextCard={currentCard} handlerClickBack={handlerClickBack}/>}
        </PaperContainer>

    );
};

export default LearningCard;