import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";
import {CardType} from "../../../bll/reducers/cardReducer";
import {CardFromServerType} from "../../../dal/cardsApi";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import {useAppSelector} from "../../../bll/store";
import {RequestStatusType} from "../../../bll/reducers/appReducer";
import EditIcon from '@mui/icons-material/Edit';
import RatingForTable from "./RatingForTable";
import style from './CardsTable.module.css'

type CardPropsType = {
    card: CardType
    delete: (id: string | undefined) => void
    edit: (id: string, model: CardFromServerType) => void
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

    return (
        <TableRow>
            <TableCell>{card.question}</TableCell>
            <TableCell>{card.answer}</TableCell>
            <TableCell>{dateUpdate}</TableCell>
            <TableCell><RatingForTable grade={card.grade as number}/> </TableCell>
            <TableCell>
                <div className={style.icons}>
                   {/* <IconButton aria-label="open" onClick={handleOpen} disabled={status === 'loading'}>
                    <ExitToAppIcon color={status === 'loading' ? "disabled" : "secondary"}/>
                </IconButton>*/}
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