import React from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";


export type packType ={
    name: string,
    user: string
    cardsCount: number,
    date: string,
    delete?: boolean,
    edit?: boolean
    learn?: boolean,
    open: boolean
}

const Pack = (props: packType) => {

    const date = new Date(props.date).toLocaleDateString();

    return (
        <TableRow>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.cardsCount}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell >{props.user}</TableCell>
            <TableCell>{props.open? 'open': ''}</TableCell>
        </TableRow>
    );
};

export default Pack;