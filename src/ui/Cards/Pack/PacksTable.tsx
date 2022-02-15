import React, {useEffect} from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Pack, {packType} from "./Pack";
import {TableBody, TableHead} from "@mui/material";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {PackType, setPacksAC, setPacksAT} from "../../../bll/reducers/packReducer";
import {useAppSelector} from "../../../bll/store";
import {RequestStatusType} from "../../../bll/reducers/appReducer";



const PacksTable = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const packs = useAppSelector<Array<PackType>>(state => state.Packs)
    useEffect(()=>{
      //dispatch(setPacksAT())
    }, [dispatch])
    /*let data = [
        {
            user: 'pasha',
            name: 'gggg', cardsCount: 4,
            date: '01/01/2022',
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z"
        },
        {
            user: 'masha',
            name: 'nnnn', cardsCount: 1,
            date: '01/01/2022',
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z"
        },
        {
            user: 'sasha',
            name: 'llllll', cardsCount: 27,
            date: '01/01/2022',
            created: "2020-05-09T15:40:40.339Z",
            updated: ""
        },
    ]*/
    return (
        <div>
            ghgghh
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Pack Name</TableCell>
                    <TableCell variant="head">Cards</TableCell>
                    <TableCell variant="head">Last Updated</TableCell>
                    <TableCell variant="head">Created By</TableCell>
                    <TableCell variant="head">Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {packs.map((u: any) => {
                        return <Pack key={`${u.user}+${u.created}+${u.name}`}
                                     name={u.name}
                                     user={u.user}
                                     cardsCount={u.cardsCount}
                                     date={u.updated ? u.updated : u.created}
                                     open={true}/>
                    })}</TableBody>
            </Table>
        </div>
    );
};

export default compose(withAuthRedirect)(PacksTable);
