import React from 'react';
import {TableHead} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

type PropsType = {
    names: string[]
}


const cellStyleCenter = {
    backgroundColor: '#ECECF9',
    fontWeight: 700,
    color: '#2D2E46',
    size: 13,
    margin: 0,
    textAlign: 'center'
}
const cellStyle = {
    backgroundColor: '#ECECF9',
    fontWeight: 700,
    color: '#2D2E46',
    size: 13,
    margin: 0,
    textAlign: 'left',
    paddingLeft: 4
}
export const TableHeader = ({names}: PropsType) => {
    return (
        <TableHead>
            <TableRow>
                {names.map((n, index) => {
                    return <TableCell key={n + index.toString()}
                                      variant="head"
                                      sx={(index === 0 || index === (names.length - 1)) ? cellStyle : cellStyleCenter}> {n} </TableCell>
                })
                }

            </TableRow>
        </TableHead>
    );
};