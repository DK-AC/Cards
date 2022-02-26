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
        <PaperContainer>
            {!isChecked
                ? <CardQuestion currentCard={currentCard} setIsChecked={setIsChecked}/>
                : <CardAnswer currentCard={currentCard} nextCardHandler={handleNext}  setIsChecked={setIsChecked}/>}
        </PaperContainer>



        // <PaperContainer>
        //     {!isChecked && (
        //         <div>
        //             <div>
        //                 <h2>Question:</h2>
        //                 <p>{currentCard.question}</p>
        //             </div>
        //
        //             <div>
        //                 <Button variant="contained" color="inherit" onClick={() => navigate(PATH.PACKS_TABLE_PAGE)}
        //                 >
        //                     Cancel
        //                 </Button>
        //                 <Button variant="contained" color="primary" onClick={() => setIsChecked(!isChecked)}>
        //                     Show Answer
        //                 </Button>
        //             </div>
        //         </div>
        //     )}
        //     <div>
        //         {isChecked && (
        //             <div>
        //                 <div>
        //                     <h2>Answer:</h2>
        //                     <p>{currentCard.answer}</p>
        //                 </div>
        //                 <div>
        //                     <div>
        //                         <Rating id={id}/>
        //                     </div>
        //                     <div>
        //                         <Button variant="contained" color="inherit" onClick={() => setIsChecked(false)}>
        //                             Back
        //                         </Button>
        //                         <Button variant="contained" color="success" onClick={() => handleNext()}>
        //                             Next
        //                         </Button>
        //                     </div>
        //                 </div>
        //             </div>
        //         )}
        //     </div>
        // </PaperContainer>

    );
};

export default LearningCard;