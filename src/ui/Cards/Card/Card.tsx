import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";
import {CardType} from "../../../bll/reducers/cardReducer";
import {CardFromServerType} from "../../../dal/cardsApi";

type CardPropsType = {
    card: CardType
    delete: (id: string | undefined) => void
    edit: (id: string, model: CardFromServerType) => void
}

const Card = ({card, ...props}: CardPropsType) => {

    const dateUpdate = card.updated && new Date(card.updated).toLocaleDateString();

    const handleDelete = () => {
        card._id && props.delete(card._id)
    }
    const handleEdit = () => {
        card._id && props.edit(card._id, {question: 'changed question', answer: 'changed answer'})
    }

    return (
        <TableRow>
            <TableCell>{card.question}</TableCell>
            <TableCell>{card.answer}</TableCell>
            <TableCell>{dateUpdate}</TableCell>
            <TableCell>{card.grade}</TableCell>
            <TableCell>
                <button onClick={handleDelete}>delete</button>
                <button onClick={handleEdit}>edit</button>
            </TableCell>
        </TableRow>
    );
};

export default compose(withAuthRedirect)(Card);