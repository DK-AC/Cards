import React from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";
import {PackType} from "../../../bll/reducers/packReducer";


export type propsType = {
    pack: PackType
    delete: (id: string) => void,
    edit: (id: string, model: PackType) => void
    open: boolean
    loginedUserID: string
    goToCard: (id: string | undefined) => void
}

const Pack = ({pack, loginedUserID, ...props}: propsType) => {

    const dateUpdate = pack.updated && new Date(pack.updated).toLocaleDateString();
    const dateCreated = pack.created && new Date(pack.created).toLocaleDateString();


    const handleDelete = () => {
        pack._id && props.delete(pack._id)
    }
    const handleEdit = () => {
        pack._id && props.edit(pack._id, {name: 'changed name'})
    }
    const goToCardHandle = () => {
        props.goToCard(pack._id)
    }


    return (
        <TableRow>
            <TableCell>{pack.name}</TableCell>
            <TableCell>{pack.cardsCount}</TableCell>
            <TableCell>{dateUpdate ? dateUpdate : dateCreated}</TableCell>
            <TableCell>some User</TableCell>
            <TableCell>
                {props.open ? 'open' : ''}
                {loginedUserID === pack.user_id && <button onClick={handleDelete}>delete</button>}
                <button onClick={handleEdit}>edit</button>
                <button onClick={goToCardHandle}>card</button>
            </TableCell>
        </TableRow>
    );
};

export default compose(withAuthRedirect)(Pack);
