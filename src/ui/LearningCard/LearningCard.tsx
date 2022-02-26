import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {CardType, changeGradeTC, setCardsTC} from "../../bll/reducers/cardReducer";
import {useDispatch} from 'react-redux';
import {useAppSelector} from "../../bll/store";
import {PATH} from '../Routes/Routes';
import Rating from "./Raiting/Rating";
import PaperContainer from '../ReusableComponents/PaperContainer/PaperContainer';
import {getRandomCard} from '../../utilities/getRandomCard';

const LearningCard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {id} = useParams()

    const cards = useAppSelector(state => state.Cards.cards)

    const [first, setFirst] = useState<boolean>(true);
    const [isChecked, setIsChecked] = useState(false);
    const [currentCard, setCurrentCard] = useState<CardType>({})


    const nextCardHandler = (grade: number) => {
        setCurrentCard(getRandomCard(cards));
        dispatch(
            changeGradeTC({grade: Number(grade), card_id: currentCard._id ? currentCard._id : "123"})
        );
        setIsChecked(false)
    };
    const handleNext = () => {
        nextCardHandler(1)
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
        <PaperContainer >
            <div>
                <h2>Question:</h2>
                <p>{currentCard.question}</p>
            </div>
            {!isChecked && (
                <div>
                    <button onClick={() => navigate(PATH.PACKS_TABLE_PAGE)}>
                        Cancel
                    </button>
                    <button onClick={() => setIsChecked(!isChecked)}>
                        Show Answer
                    </button>
                </div>
            )}
            <div>
                {isChecked && (
                    <div>
                        <div>
                            <h2>Answer:</h2>
                            <p>{currentCard.answer}</p>
                        </div>
                        <div>
                            <div>
                                <Rating id={id}/>
                            </div>
                            <div>
                                <button onClick={() => setIsChecked(false)}>
                                    Back
                                </button>
                                <button onClick={() => handleNext()}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PaperContainer>

    );
};

export default LearningCard;