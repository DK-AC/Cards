import React, {ChangeEvent, useEffect, useState} from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Pack from "./Pack";
import {CircularProgress, Slider, Switch, TableBody, TableHead} from "@mui/material";
import {useDispatch} from "react-redux";
import {addPackAT, changePackTC, deletePackAT, PackType, setPacksAT} from "../../../bll/reducers/packReducer";
import {useAppSelector} from "../../../bll/store";
import {RequestStatusType, setAppErrorAC} from "../../../bll/reducers/appReducer";
import Pagenator from "../../ReusableComponents/Pagenator/Pagenator";
import style from './PacksTable.module.css'
import {Search} from "../../ReusableComponents/Search/Search";
import {useDebounce} from "../../ReusableComponents/UseDebounce";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Button from "@mui/material/Button";
import { ParamsPackType } from '../../../dal/packsApi';


const PacksTable = () => {

    const dispatch = useDispatch()
    const status = useAppSelector<RequestStatusType>(store => store.App.status)

    const userId = useAppSelector<string>(state => state.Profile._id)
    const packs = useAppSelector<Array<PackType>>(state => state.Packs.cardPacks)
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)


    //локальные стейты
    //для инпута (чтоб найти имя колоды)
    const [packName, setPackName] = useState<string>('')
    //для слайдера
    const [sliderValue, setSliderValue] = useState<number[]>([0, 9])
    //моя или нет колода
    const [myPacks, setMyPacks] = useState<boolean>(false)
    const user_id = myPacks ? userId : ''

    //задержки от лишних запросов на сервер
    const debouncedPackName = useDebounce(packName, 500)
    const debouncedMin = useDebounce(sliderValue[0], 500)
    const debouncedMax = useDebounce(sliderValue[1], 500)

    //локал стейты для пагинатора
    const [currentPage, setCurrentPage] = useState<number>(1)  //какая страница выбрана
    const [pageCount, setPageCount] = useState<number>(5)  // сколько колод на старице

    //сколько всего колод
    const cardPacksTotalCount = useAppSelector<number>(state => state.Packs.cardPacksTotalCount)


    const params: ParamsPackType = {
        packName,
        min: sliderValue[0],
        max: sliderValue[1],
        user_id,
        page: currentPage,
        pageCount
    }

    useEffect(() => {
        dispatch(setAppErrorAC(null))
        isInitialized && dispatch(setPacksAT(params))
    }, [dispatch, debouncedPackName, debouncedMin, debouncedMax, myPacks, currentPage, pageCount, packName])

    //обработчики колод (добавление, удаление, изменение)
    const handleClickAddPack = () => {
        dispatch(addPackAT(params, 'testing name for test because test'))
    }
    const handleClickDeletePack = (packID: string) => {
        dispatch(deletePackAT(packID, params))
    }
    const handleClickEditPack = (packID: string, model: PackType) => {
        dispatch(changePackTC(packID, model, params))
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
                    <Button variant="outlined" color={'secondary'} disabled={status==='loading'}
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
                                         edit={handleClickEditPack}/>
                        })}</TableBody>
                </Table>
            </div>
            <Pagenator currentPage={currentPage} countItemsOnPage={pageCount} totalItems={cardPacksTotalCount}
                       onPageChanged={onPageChanged}
                       countItemsOnPageChanged={countItemsChanged}/>
            <div className={style.loadind}>{status === 'loading' && <CircularProgress size={'8rem'}/>}</div>
        </div>
    );
};

export default compose(withAuthRedirect)(PacksTable);

function valuetext(value: number) {
    return `${value}°C`;
}