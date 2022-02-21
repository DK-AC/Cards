import React from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";
import {PackType} from "../../../bll/reducers/packReducer";
import {IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {useAppSelector} from "../../../bll/store";
import {RequestStatusType} from "../../../bll/reducers/appReducer";
import {useNavigate} from "react-router-dom";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

export type propsType = {
    pack: PackType
    delete: (id: string) => void,
    edit: (id: string, model: PackType) => void
    loginedUserID: string
}

const Pack = ({pack, loginedUserID, ...props}: propsType) => {

    const navigate = useNavigate()

    const status = useAppSelector<RequestStatusType>(store => store.App.status)

    const dateUpdate = pack.updated && new Date(pack.updated).toLocaleDateString();
    const dateCreated = pack.created && new Date(pack.created).toLocaleDateString();

//cb чтобы открыть карточку
    const handleOpen = () => {
        navigate(`/cards/${pack._id}`)
    }
    const handleDelete = () => {
        pack._id && props.delete(pack._id)
    }
    const handleEdit = () => {
        let model={
            name: pack.name
        }
        pack._id && props.edit(pack._id, model)
    }
    const handleLearn =()=>{
        console.log('start learn')
    }

    return (
        <TableRow>
            <TableCell>{pack.name}</TableCell>
            <TableCell>{pack.cardsCount}</TableCell>
            <TableCell>{dateUpdate ? dateUpdate : dateCreated}</TableCell>
            <TableCell>some User</TableCell>
            <TableCell>
                <IconButton aria-label="open" onClick={handleLearn} disabled={status === 'loading'}>
                    <ArrowCircleRightOutlinedIcon color={status === 'loading' ? "disabled" : "success"}/>
                </IconButton>
                <IconButton aria-label="open" onClick={handleOpen} disabled={status === 'loading'}>
                    <ExitToAppIcon color={status === 'loading' ? "disabled" : "secondary"}/>
                </IconButton>
                {loginedUserID === pack.user_id &&
                    <IconButton aria-label="edit" onClick={handleEdit} disabled={status === 'loading'}>
                        <EditIcon color={status === 'loading' ? "disabled" : "action"}/>
                    </IconButton>
                }
                {loginedUserID === pack.user_id &&
                    <IconButton aria-label="delete" onClick={handleDelete} disabled={status === 'loading'}>
                        <HighlightOffIcon color={status === 'loading' ? "disabled" : "error"}/>
                    </IconButton>
                }
            </TableCell>
        </TableRow>
    );
};

export default compose(withAuthRedirect)(Pack);
