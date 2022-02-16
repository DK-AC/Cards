import React, {useEffect} from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Pack  from "./Pack";
import { TableBody, TableHead} from "@mui/material";
import {useDispatch} from "react-redux";
import {
    addPackAT,
    changePackTC,
    deletePackAT,
    PackType,
    setPacksAT
} from "../../../bll/reducers/packReducer";
import {useAppSelector} from "../../../bll/store";
import {setAppErrorAC} from "../../../bll/reducers/appReducer";
import Pagenator from "../../ReusableComponents/Pagenator/Pagenator";



const PacksTable = () => {
    const dispatch = useDispatch()

    const packs = useAppSelector<Array<PackType>>(state => state.Packs)
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)

    useEffect(()=>{
        dispatch(setAppErrorAC(null))
        isInitialized && dispatch(setPacksAT())
    }, [dispatch])

    const handleClickAddPack=()=>{
        dispatch(addPackAT('testing name for test because test'))
    }
    const handleClickDeletePack =(packID: string)=>{
        dispatch(deletePackAT(packID))
    }
    const handleClickEditPack =(packID: string,model: PackType)=>{
        dispatch(changePackTC(packID, model))
    }

    return (
        <div>
            <button  onClick={handleClickAddPack}>Add Pack</button>
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
                    {packs.map((pack: PackType) => {
                        return <Pack key={`${pack.user_id}+${pack.created}+${pack.name}`}
                                     pack={pack}
                                     open={true}
                                     delete={handleClickDeletePack}
                        edit={handleClickEditPack}/>
                    })}</TableBody>
            </Table>
           <Pagenator currentPage={7} countItemsOnPage={5} totalItems = {10}/>
        </div>
    );
};

export default compose(withAuthRedirect)(PacksTable);
