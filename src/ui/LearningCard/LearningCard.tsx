import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {CardType, changeGradeTC, setCardsTC} from "../../bll/reducers/cardReducer";
import {useDispatch} from 'react-redux';
import {useAppSelector} from "../../bll/store";
import PaperContainer from '../ReusableComponents/PaperContainer/PaperContainer';
import {getRandomCard} from '../../utilities/getRandomCard';
import CardQuestion from './CardQuestion';
import CardAnswer from './CardAnswer';

const LearningCard = () => {

    const dispatch = useDispatch();

    const {id} = useParams()

    const cards = useAppSelector(state => state.Cards.cards)
    const grade = useAppSelector<number>(state => state.Cards.grade)

    const [first, setFirst] = useState<boolean>(true);
    const [isChecked, setIsChecked] = useState(false);
    const [currentCard, setCurrentCard] = useState<CardType>({})


    const nextCardHandler = (grade: number) => {
        setCurrentCard(getRandomCard(cards));
        dispatch(
            changeGradeTC({grade: grade, card_id: currentCard._id})
        );
        setIsChecked(false)
    };
    const handleNext = () => {
        nextCardHandler(grade)
    }


    useEffect(() => {
        if (first) {
            id && dispatch(setCardsTC({cardsPack_id: id}));
            setFirst(false);
        }
        if (cards.length > 0) {
            setCurrentCard(getRandomCard(cards));
        }
    }, [cards]);

    return (
        <PaperContainer>
            {!isChecked
                ? <CardQuestion currentCard={currentCard} setIsChecked={setIsChecked}/>
                : <CardAnswer currentCard={currentCard} handleNext={handleNext} setIsChecked={setIsChecked}/>}
        </PaperContainer>
    );
};

export default LearningCard;