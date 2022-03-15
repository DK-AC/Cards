import React, {useState} from 'react';
import Paper from "@mui/material/Paper";
import style from "../PacksTablePage.module.css";
import {TableBody, TableContainer, TableHead} from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {changePackTC, deletePackAT, PackType} from "../../../../bll/reducers/packReducer";
import Pack from "./Pack/Pack";
import Pagenator from "../../../ReusableComponents/Pagenator/Pagenator";
import {Modal} from "../../../ReusableComponents/Modal/Modal";
import {DeleteModal} from "../../../ReusableComponents/Modal/CommonModals/DeleteModal";
import {UpdatePack} from "../../../ReusableComponents/Modal/PacksModals/UpdatePack";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../../bll/store";
import {ParamsPackType} from "../../../../dal/packsApi";
import {TableHeader} from "../../../ReusableComponents/TableHeader/TableHeader";




type propsType ={
    packs:Array<PackType>
    params: ParamsPackType
    onPageChanged:(page: number) => void
    countItemsChanged: (pageCount: number) => void
}

const PacksTable = ({params,packs,...props}:propsType) => {
    const userId = useAppSelector<string>(state => state.Profile._id) //


    const dispatch = useDispatch()


    const [pack, setPack] = useState<PackType>({})
    const [packId, setPackId] = useState('')
    //модалки
    const [deleteModal, setDeleteModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    //закрыть модалку
    const closeUpdateModal = () => {
        setUpdateModal(false)
    }
    const closeDeleteModal = () => {
        setDeleteModal(false)
    }

    //удаление паков
    const handleClickDeletePack = (packId: string) => {
        setPackId(packId)
        setDeleteModal(true)
    }
    const deletePack = () => {
        dispatch(deletePackAT(packId, params))
        setDeleteModal(false);
    }
    //update
    const handleClickEditPack = (packId: string, pack: PackType) => {
        setPackId(packId)
        setPack(pack)
        setUpdateModal(true)
    }
    const updatePack = (text: string) => {
        if (text.length) {
            dispatch(changePackTC(packId, {name: text}, params))
            setUpdateModal(false)
        }
    }
//сколько всего колод
    const cardPacksTotalCount = useAppSelector<number>(state => state.Packs.cardPacksTotalCount)

    return (
        <>
            <Paper  sx={{ width: 780, overflow: 'hidden', boxShadow: 3}} >
                <TableContainer sx={{ maxHeight: 420 }}>
                    <Table stickyHeader aria-label="sticky table"  >
                        <TableHeader names={[`Pack's Name`, 'Cards','Last Updated', 'Created by', 'Actions']} />
                        <TableBody>
                            {packs.map((pack: PackType, index) => {
                                return <Pack key={`${pack.user_id}+${pack.created}+${pack.name}`}
                                             loginedUserID={userId}
                                             pack={pack}
                                             delete={handleClickDeletePack}
                                             edit={handleClickEditPack}
                                             index={index}
                                />
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Pagenator currentPage={params.page} countItemsOnPage={params.pageCount} totalItems={cardPacksTotalCount}
                       onPageChanged={props.onPageChanged}
                       countItemsOnPageChanged={props.countItemsChanged}/>

            {/*//modal*/}
            <Modal isOpen={deleteModal} closeModal={closeDeleteModal}>
                <DeleteModal showDelete={setDeleteModal} deleteFunction={deletePack}/>
            </Modal>
            <Modal isOpen={updateModal} closeModal={closeUpdateModal}>
                <UpdatePack showUpdate={setUpdateModal} updatePack={updatePack} packName={pack.name}/>
            </Modal>
        </>
    );
};

export default PacksTable;





