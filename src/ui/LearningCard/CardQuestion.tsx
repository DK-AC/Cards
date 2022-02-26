import React from 'react';
// import style from './LearningCard.module.css'
// import {Button} from "@mui/material";
// import {CardType} from "../../bll/reducers/cardReducer";
//
// export type CardQuestionType = {
//     currentCard: CardType;
//     isChecked: boolean;
//     setIsChecked: (isChecked: boolean) => void;
//     setGradeValue: (gradeValue: number) => void;
//     nextCardHandler: (grade: number) => void;
// }
//
// const CardQuestion = ({currentCard, nextCardHandler, setGradeValue, setIsChecked, isChecked}: CardQuestionType) => {
//
//     const handlerClickBack = () => {
//         props.handlerClickBack()
//     }
//
//     const handlerClickAnswer = () => {
//         props.onClickHandler(true)
//     }
//     return (
//         <div className={style.container}>
//             <div className={style.block}>
//                 <h3 className={style.title}>Question:</h3>
//                 <p className={style.question}>{currentCard.question}</p>
//             </div>
//             <div className={style.buttonMenu}>
//                 <Button variant="contained" onClick={handlerClickBack}>Back up</Button>
//                 <Button variant="contained" color={"success"} onClick={handlerClickAnswer}>Answer</Button></div>
//         </div>
//
//     );
// };
//
// export default CardQuestion;