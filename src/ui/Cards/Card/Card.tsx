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

    const dateUpdate = updated && new Date(updated).toLocaleDateString();

    return (
        <TableRow>
            <TableCell>{question}</TableCell>
            <TableCell>{answer}</TableCell>
            <TableCell>{dateUpdate}</TableCell>
            <TableCell>{grade}</TableCell>
            <TableCell>
                {/*<button onClick={()=>{}}>delete</button>*/}
                {/*<button onClick={()=>{}}>edit</button>*/}
            </TableCell>
        </TableRow>
    );
};

export default compose(withAuthRedirect)(Card);