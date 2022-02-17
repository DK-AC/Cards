import React from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";

const Card = ({}) => {

    // const dateUpdate = pack.updated && new Date(pack.updated).toLocaleDateString();
    // const dateCreated = pack.created && new Date(pack.created).toLocaleDateString();
    //
    //
    //
    // const handleDelete = () => {
    //     pack._id && props.delete(pack._id)
    // }
    // const handleEdit = () => {
    //     pack._id && props.edit(pack._id, {name: 'changed name'})
    // }

    return (
        <div>123</div>
    //     <TableRow>
    //         <TableCell>{pack.name}</TableCell>
    //         <TableCell>{pack.cardsCount}</TableCell>
    //         <TableCell>{dateUpdate ? dateUpdate : dateCreated}</TableCell>
    //         <TableCell>some User</TableCell>
    //         <TableCell>
    //             {props.open ? 'open' : ''}
    //             {loginedUserID === pack.user_id && <button onClick={handleDelete}>delete</button>}
    //             <button onClick={handleEdit}>edit</button>
    //         </TableCell>
    //     </TableRow>
    );
};

export default compose(withAuthRedirect)(Card);