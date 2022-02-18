import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";
import {CardType} from "../../../bll/reducers/cardReducer";

type CardPropsType = {
    card: CardType
    delete: (id: string | undefined) => void
}

const Card = ({card, ...props}: CardPropsType) => {

    const dateUpdate = card.updated && new Date(card.updated).toLocaleDateString();

    const handleDelete = () => {
        card._id && props.delete(card._id)
    }

    return (
        <TableRow>
            <TableCell>{card.question}</TableCell>
            <TableCell>{card.answer}</TableCell>
            <TableCell>{dateUpdate}</TableCell>
            <TableCell>{card.grade}</TableCell>
            <TableCell>
                <button onClick={handleDelete}>delete</button>
                {/*<button onClick={()=>{}}>edit</button>*/}
            </TableCell>
        </TableRow>
    );
};

export default compose(withAuthRedirect)(Card);