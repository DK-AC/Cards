import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";
import { CardType } from '../../../bll/reducers/cardReducer';

type CardPropsType = {
    card: CardType
    delete: () => void
    edit: () => void
    open: boolean
    loginedUserID: string
}

const Card = ({card, loginedUserID, ...props}: CardPropsType) => {

    const dateUpdate = card.updated && new Date(card.updated).toLocaleDateString();
    const dateCreated = card.created && new Date(card.created).toLocaleDateString();

    const handleDelete = () => {
        card._id && props.delete()
        // card._id && props.delete(card._id)
    }
    const handleEdit = () => {
        card._id && props.edit()
        // card._id && props.edit(card._id, {name: 'changed name'})
    }

    return (
        <TableRow>
            <TableCell>{card.question}</TableCell>
            <TableCell>{card.answer}</TableCell>
            <TableCell>{dateUpdate ? dateUpdate : dateCreated}</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>
                {props.open ? 'open' : ''}
                {loginedUserID === card.user_id && <button onClick={handleDelete}>delete</button>}
                <button onClick={handleEdit}>edit</button>
                <button onClick={handleEdit}>delete</button>
            </TableCell>
        </TableRow>
    );
};

export default compose(withAuthRedirect)(Card);