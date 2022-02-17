import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";

type CardPropsType = {
    question: string
    answer: string
    updated: string
    grade: string

}

const Card = ({grade, question, answer, updated}: CardPropsType) => {

    // const dateUpdate = card.updated && new Date(card.updated).toLocaleDateString();
    // const dateCreated = card.created && new Date(card.created).toLocaleDateString();

    return (
        <TableRow>
            <TableCell>{question}</TableCell>
            <TableCell>{answer}</TableCell>
            <TableCell>{updated}</TableCell>
            <TableCell>{grade}</TableCell>
        </TableRow>
    );
};

export default compose(withAuthRedirect)(Card);