import React from 'react';
// import style from './LearningCard.module.css'
// import {Button} from "@mui/material";
// import {useNavigate} from "react-router-dom";
// import Rating from "./Raiting/Rating";
// import {CardType} from "../../bll/reducers/cardReducer";
//
// type CardAnswerType = {
//     currentCard: CardType;
//     isChecked: boolean;
//     setIsChecked: (isChecked: boolean) => void;
//     setGradeValue: (gradeValue: number) => void;
//     nextCardHandler: (grade: number) => void;
// }
//
// const CardAnswer = ({currentCard, nextCardHandler, setGradeValue, setIsChecked, isChecked}: CardAnswerType) => {
//     const navigate = useNavigate()
//     const handlerClickBack = () => {
//         props.handlerClickBack()
//     }
//     const handlerClickNextQuestion = () => {
//         nextCard && navigate(`/cards/card/${nextCard._id}`)
//     }
//
//     const id = card ? card._id as string : '111'
//     return (
//         <div className={style.container}>
//             <div className={style.block}>
//                 <h3 className={style.title}>Question:</h3>
//                 <p className={style.info}>{card.question}</p>
//             </div>
//             <div className={style.block}>
//                 <h3 className={style.title}>Answer:</h3>
//                 <p className={style.info}>{card.answer}</p>
//             </div>
//             <Rating id={id}/>
//             <div className={style.buttonMenu}>
//                 <Button variant="contained" onClick={handlerClickBack}>Back up</Button>
//                 <Button variant="contained" color={"success"} onClick={handlerClickNextQuestion}>Next</Button>
//             </div>
//         </div>
//     );
// };
//
// export default CardAnswer;