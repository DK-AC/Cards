import React from 'react';
import style from './LearningCard.module.css'
import {Button} from "@mui/material";
import {CardType} from "../../bll/reducers/cardReducer";
import {useNavigate} from "react-router-dom";
import {PATH} from '../Routes/Routes';
import {ArrowBack} from "@mui/icons-material";
import {useAppSelector} from "../../bll/store";
import {RequestStatusType} from "../../bll/reducers/appReducer";
import VisibilityIcon from '@mui/icons-material/Visibility';


export type CardQuestionType = {
    currentCard: CardType
    setIsChecked: (isChecked: boolean) => void
}

const CardQuestion = ({currentCard, setIsChecked}: CardQuestionType) => {

    const navigate = useNavigate()
    const status = useAppSelector<RequestStatusType>(store => store.App.status)

    const handlerClickBack = () => {
        navigate(PATH.PACKS_TABLE_PAGE)
    }
    const handlerClickAnswer = () => {
        setIsChecked(true)
    }

    return (
        <div className={style.container}>
            <div className={style.block}>
                <h3 className={style.title}>Question:</h3>
                <p className={style.question}>{currentCard.question}</p>
            </div>
            <div className={style.buttonMenu}>
                <Button variant="outlined"
                        color={'inherit'}
                        size={"small"}
                        disabled={status === 'loading'}
                        startIcon={<ArrowBack/>}
                        onClick={handlerClickBack}>
                    Back
                </Button>
                <Button variant="outlined"
                        color={'success'}
                        size={"small"}
                        disabled={status === 'loading'}
                        startIcon={<VisibilityIcon/>}
                        onClick={handlerClickAnswer}>
                    Show Answer
                </Button>
            </div>
        </div>

    );
};

export default CardQuestion;