import React from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";
import {PackType} from "../../../bll/reducers/packReducer";
import {useAppSelector} from "../../../bll/store";


export type propsType = {
    pack: PackType
    delete: (id: string) => void,
    edit: (id: string, model: PackType) => void
    open: boolean
    //loginedUserID: string
}

const Pack = ({pack, ...props}: propsType) => {

    const dateUpdate = pack.updated && new Date(pack.updated).toLocaleDateString();
    const dateCreated = pack.created && new Date(pack.created).toLocaleDateString();



    const handleDelete = () => {
        pack._id && props.delete(pack._id)
    }
    const handleEdit = () => {
        pack._id && props.edit(pack._id, {name: 'changed name'})
    }

    return (
        <TableRow>
            <TableCell>{pack.name}</TableCell>
            <TableCell>{pack.cardsCount}</TableCell>
            <TableCell>{dateUpdate ? dateUpdate : dateCreated}</TableCell>
            <TableCell>some User</TableCell>
            <TableCell>
                {props.open ? 'open' : ''}
                 <button onClick={handleDelete}>delete</button>
                <button onClick={handleEdit}>edit</button>
            </TableCell>
        </TableRow>
    );
};

export default compose(withAuthRedirect)(Pack);
