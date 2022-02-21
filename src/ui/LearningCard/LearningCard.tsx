import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PaperContainer from "../ReusableComponents/PaperContainer/PaperContainer";
import {useAppSelector} from "../../bll/store";
import {CardType} from "../../bll/reducers/cardReducer";
import {PackType} from "../../bll/reducers/packReducer";
import CardQuestion from "./CardQuestion";
import {useDispatch} from "react-redux";

const LearningCard = () => {
    const dispatch = useDispatch()
    const{id}=useParams<{id:string}>()
    const[answerSent, setAnswerSent]= useState<boolean>(false) //был ответ?
    const cards = useAppSelector<Array<CardType>>(state => state.Cards.cards)
    const packs =  useAppSelector<Array<PackType>>(state => state.Packs.cardPacks)
    let pack :PackType|undefined
    const card = cards.find(card=> card._id===id)
    if (card){
       pack = packs.find(pack=> pack._id === card.cardsPack_id )}
    useEffect(()=>{

    },[])
   const onClickHandler =(answerSent:boolean)=>{setAnswerSent(answerSent)}

    let cardQuestion = card ? card.question: 'some card'
    let packName =  pack? pack.name: 'some pack'

    return (
        <PaperContainer title={`Learn pack "${packName}"`} >
                {!answerSent && <CardQuestion question={cardQuestion} onClickHandler ={onClickHandler}/>}
        </PaperContainer>

    );
};

export default LearningCard;