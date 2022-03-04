import React, {ChangeEvent, useEffect, useState} from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Pack from "./Pack";
import {CircularProgress, Slider, Switch, TableBody, TableHead} from "@mui/material";
import {useDispatch} from "react-redux";
import {addPackTC, changePackTC, deletePackAT, PackType, setPacksAT} from "../../../bll/reducers/packReducer";
import {useAppSelector} from "../../../bll/store";
import {RequestStatusType, setAppErrorAC} from "../../../bll/reducers/appReducer";
import Pagenator from "../../ReusableComponents/Pagenator/Pagenator";
import style from './PacksTable.module.css'
import {Search} from "../../ReusableComponents/Search/Search";
import {useDebounce} from "../../ReusableComponents/UseDebounce";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Button from "@mui/material/Button";
import {ParamsPackType} from '../../../dal/packsApi';
import {Modal} from "../../ReusableComponents/Modal/Modal";
import {DeleteModal} from "../../ReusableComponents/Modal/DeleteModal";
import {AddPack} from "../../ReusableComponents/Modal/PacksModals/AddPack";
import {UpdatePack} from "../../ReusableComponents/Modal/PacksModals/UpdatePack";
import {CardType} from "../../../bll/reducers/cardReducer";


const PacksTable = () => {

    const dispatch = useDispatch()
    const status = useAppSelector<RequestStatusType>(store => store.App.status)
    const userId = useAppSelector<string>(state => state.Profile._id)
    const packs = useAppSelector<Array<PackType>>(state => state.Packs.cardPacks)
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)
    const cards = useAppSelector<Array<CardType>>(state => state.Cards.cards)

    //локальные стейты
    //для инпута (чтоб найти имя колоды)
    const [packName, setPackName] = useState<string>('')
    //для слайдера
    const [sliderValue, setSliderValue] = useState<number[]>([0, 100])
    //моя или нет колода
    const [myPacks, setMyPacks] = useState<boolean>(false)
    const user_id = myPacks ? userId : ''
    const [packId, setPackId] = useState('')

    //задержки от лишних запросов на сервер
    const debouncedPackName = useDebounce(packName, 500)
    const debouncedMin = useDebounce(sliderValue[0], 500)
    const debouncedMax = useDebounce(sliderValue[1], 500)

    //локал стейты для пагинатора
    const [currentPage, setCurrentPage] = useState<number>(1)  //какая страница выбрана
    const [pageCount, setPageCount] = useState<number>(5)  // сколько колод на старице

    //сколько всего колод
    const cardPacksTotalCount = useAppSelector<number>(state => state.Packs.cardPacksTotalCount)
    //модалки
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [pack, setPack] = useState<PackType>({})

    const params: ParamsPackType = {
        packName,
        min: sliderValue[0],
        max: sliderValue[1],
        user_id,
        page: currentPage,
        pageCount
    }

    //при обновлении страницы не отображались паки
    //добавил isInitialized в зависимости и после обновления все паки перерисовываются
    useEffect(() => {
        dispatch(setAppErrorAC(null))
        isInitialized && dispatch(setPacksAT(params))
    }, [dispatch, debouncedPackName, debouncedMin, debouncedMax, myPacks, currentPage, pageCount, packName, isInitialized])

    //обработчики колод (добавление, удаление, изменение)
    //add
    const handleClickAddPack = () => {
        setAddModal(true)
    }
    const addPack = (text: string) => {
        if (text.length) {
            dispatch(addPackTC(params, text))
            setAddModal(false)
        }
    }

    //delete
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

    //обработчики для пагинации
    const onPageChanged = (page: number) => setCurrentPage(page)
    const countItemsChanged = (pageCount: number) => setPageCount(pageCount)

    //обработчик для изменения инпута
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => setPackName(e.target.value)

    //обработчик для изменения бегунков слайдера
    const sliderHandler = (event: Event, newValue: number | number[]) => setSliderValue(newValue as number[]);


    //показать только мои колоды
    const showOnlyMyPacks = () => setMyPacks(!myPacks)

    return (
        <div className={style.container}>
            {/*настройки поиска*/}
            <div className={style.settingsMenu}>
                <div className={style.column}>
                    <div>All<Switch checked={myPacks} onChange={showOnlyMyPacks}/> My</div>
                    <Button variant="outlined" color={'secondary'} disabled={status === 'loading'}
                            startIcon={<ControlPointIcon/>}
                            onClick={handleClickAddPack}>
                        Add Pack
                    </Button>
                </div>
                <div>
                    <Slider value={sliderValue}
                            onChange={sliderHandler}
                            getAriaLabel={() => 'Temperature range'}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}/>
                    <Search searchValue={packName} onChangeSearch={onChangeSearch}/>
                </div>
            </div>
            {/*таблица*/}
            <div className={style.Table}>
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
                                         loginedUserID={userId}
                                         pack={pack}
                                         delete={handleClickDeletePack}
                                         edit={handleClickEditPack}
                            />
                        })}</TableBody>
                </Table>
            </div>
            <Pagenator currentPage={currentPage} countItemsOnPage={pageCount} totalItems={cardPacksTotalCount}
                       onPageChanged={onPageChanged}
                       countItemsOnPageChanged={countItemsChanged}/>
            <div className={style.loading}>
                {status === 'loading' && <CircularProgress size={'8rem'}/>}
            </div>

            {/*//modal*/}
            <Modal isOpen={deleteModal}>
                <DeleteModal showDelete={setDeleteModal} deleteFunction={deletePack}/>
            </Modal>
            <Modal isOpen={addModal}>
                <AddPack showAdd={setAddModal} addPack={addPack}/>
            </Modal>

            <Modal isOpen={updateModal}>
                <UpdatePack showUpdate={setUpdateModal} updatePack={updatePack} packName={pack.name}/>
            </Modal>


        </div>
    );
};

export default compose(withAuthRedirect)(PacksTable);

function valuetext(value: number) {
    return `${value}°C`;
}