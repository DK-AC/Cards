import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../../../../bll/HOK/withAuthRedirect";
import {CardType} from "../../../../../bll/reducers/cardReducer";
import {CardFromServerType} from "../../../../../dal/cardsApi";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import {useAppSelector} from "../../../../../bll/store";
import {RequestStatusType} from "../../../../../bll/reducers/appReducer";
import EditIcon from '@mui/icons-material/Edit';
import RatingForTable from "./RatingForTable";
import style from './Card.module.css'

type CardPropsType = {
    card: CardType
    delete: (id: string | undefined) => void
    edit: (id: string, model: CardFromServerType) => void
    index:number
}

const Card = ({card, ...props}: CardPropsType) => {

    const status = useAppSelector<RequestStatusType>(store => store.App.status)
    const dateUpdate = card.updated && new Date(card.updated).toLocaleDateString();

    const handleDelete = () => {
        card._id && props.delete(card._id)
    }
    const handleEdit = () => {
        let model: CardFromServerType = {
            question: card.question,
            answer: card.answer
        }
        card._id && props.edit(card._id, model)
    }

    //визуал, чтоб слишком длинное название не скашивало таблицу
    const question = (card.question && card.question.length<20 )? card.question :  card.question?.slice(0, 12)+'...'
    const answer = (card.answer && card.answer.length<20 )? card.answer :  card.answer?.slice(0, 12)+'...'

    return (
        <TableRow sx={  {backgroundColor:  props.index %2 ? '#F8F7FD' : 'white' }} hover>
            <TableCell  sx={{ width: 140 , paddingLeft: 4, textAlign: 'left',borderBottom:0 }}>{question}</TableCell>
            <TableCell sx={{ textAlign: 'center',borderBottom:0 }}>{answer}</TableCell>
            <TableCell sx={{ textAlign: 'center',borderBottom:0 }}>{dateUpdate}</TableCell>
            <TableCell sx={{ textAlign: 'center',borderBottom:0 }}><RatingForTable grade={card.grade as number}/> </TableCell>
            <TableCell  sx={{textAlign: 'left',borderBottom:0 }}>
                <div className={style.icons}>
                    <IconButton aria-label="change" onClick={handleEdit} disabled={status === 'loading'}>
                        <EditIcon color={status === 'loading' ? "disabled" : "action"}/>
                    </IconButton>
                    <IconButton aria-label="delete" onClick={handleDelete} disabled={status === 'loading'}>
                        <DeleteIcon color={status === 'loading' ? "disabled" : "error"}/>
                    </IconButton>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default compose(withAuthRedirect)(Card);