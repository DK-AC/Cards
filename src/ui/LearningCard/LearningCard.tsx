import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {CardType, changeGradeTC, setCardsTC} from "../../bll/reducers/cardReducer";
import {useDispatch} from 'react-redux';
import {useAppSelector} from "../../bll/store";
import PaperContainer from '../ReusableComponents/PaperContainer/PaperContainer';
import {getRandomCard} from '../../utilities/getRandomCard';
import CardQuestion from './CardQuestion';
import CardAnswer from './CardAnswer';
import {PackType} from "../../bll/reducers/packReducer";
import ButtonMenu from "./ButtonMenu/ButtonMenu";
import style from './LearningCard.module.css'

const LearningCard = () => {

    const dispatch = useDispatch();

    const {id} = useParams()

    const cards = useAppSelector(state => state.Cards.cards)
    const grade = useAppSelector<number>(state => state.Cards.grade)
    const packs = useAppSelector<Array<PackType>>(state => state.Packs.cardPacks)

    const [first, setFirst] = useState<boolean>(true);
    const [isChecked, setIsChecked] = useState(false);
    const [currentCard, setCurrentCard] = useState<CardType>({})

    // имя колоды
    const pack = packs.find(p=>p._id === id)
    const packName = pack? pack.name: 'some name'

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
    const handlerClickAnswer = () => {
        setIsChecked(true)
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
        <PaperContainer title={`Pack's name: ${packName}`}>
            <div className={style.content}>
                {!isChecked
                ? <CardQuestion currentCard={currentCard}/> : <CardAnswer currentCard={currentCard}/>}
            </div>
            {!isChecked
                ?<ButtonMenu rightIcon={'VisibilityIcon'} handlerClickRightButton={handlerClickAnswer} rightButtonName={'Answer'} />
                : <ButtonMenu rightIcon={'ArrowForwardIcon'} handlerClickRightButton={handleNext } rightButtonName={'Next'} />}
        </PaperContainer>
    );
};

export default LearningCard;