import React, {ChangeEvent, useEffect, useState} from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Pack  from "./Pack";
import {Slider, Switch, TableBody, TableHead} from "@mui/material";
import {useDispatch} from "react-redux";
import {
    addPackAT, changeItemsOnPageAC,
    changePackTC, changePageAC,
    deletePackAT,
    PackType,
    setPacksAT
} from "../../../bll/reducers/packReducer";
import {useAppSelector} from "../../../bll/store";
import {setAppErrorAC} from "../../../bll/reducers/appReducer";
import Pagenator from "../../ReusableComponents/Pagenator/Pagenator";
import PaperContainer from "../../ReusableComponents/PaperContainer/PaperContainer";
import style from './PacksTable.module.css'
import {ReusableButton} from "../../ReusableComponents/ReusableButton/ReusableButton";
import {Search} from "../../ReusableComponents/Search/Search";
import {useDebounce} from "../../ReusableComponents/UseDebounce";


const PacksTable = () => {
    const dispatch = useDispatch()
    const packs = useAppSelector<Array<PackType>>(state => state.Packs.cardPacks)
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)
    const userId = useAppSelector<string>(state=>state.Profile._id)
    const [packName, setPackName] = useState<string>('')
    const [sliderValue, setSliderValue] = useState<number[]>([0,9])
    const [myPacks, setMyPacks] = useState<boolean>(false)
    const debouncedPackName = useDebounce(packName,500)
    const debouncedMin = useDebounce(sliderValue[0],500)
    const debouncedMax = useDebounce(sliderValue[1],500)
    const user_id = myPacks ? userId : ''
    const cardPacksTotalCount= useAppSelector<number>(state=> state.Packs.cardPacksTotalCount)
    const page = useAppSelector<number>(state=>state.Packs.page)
    const pageCount = useAppSelector<number>(state=>state.Packs.pageCount)
    const loginedUserID = useAppSelector<string>(state=>state.Login.idUser)

    const params = {
        packName,
        min:sliderValue[0],
        max:sliderValue[1],
        user_id
    }

    useEffect(()=>{
        dispatch(setAppErrorAC(null))
        isInitialized && dispatch(setPacksAT(params))
    }, [dispatch,debouncedPackName,debouncedMin,debouncedMax,myPacks])

        //обработчики колод (добавление, удаление, изменение)
    const handleClickAddPack=()=>{
        dispatch(addPackAT({},'testing name for test because test'))
        dispatch(setPacksAT(params))
    }
    const handleClickDeletePack =(packID: string)=>{
        dispatch(deletePackAT(packID,params))
    }
    const handleClickEditPack =(packID: string,model: PackType)=>{
        dispatch(changePackTC(packID,model, params))}

    //обработчики для пагинации
    const onPageChanged =(page:number)=> dispatch(changePageAC(page))
    const countItemsChanged =(pageCount:number)=> dispatch(changeItemsOnPageAC(pageCount))

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) =>{
        setPackName(e.target.value)
    }
    const sliderHandler = (event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number[]);
    };
    const showOnlyMyPacks = () => {
        setMyPacks(!myPacks)
    }

    return (
        <PaperContainer title={`My Pack's list`} tableStyle={true}>
            <div className={style.callSettingsMenu}>
                <ReusableButton title={'Add Pack'} onClickHandler={handleClickAddPack} size={'small'}
                                color={'secondary'}/>
                <Search searchValue={packName} onChangeSearch={onChangeSearch}/>

                <Slider value={sliderValue}
                        onChange={sliderHandler}
                        getAriaLabel={() => 'Temperature range'}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}/>
                <Switch checked={myPacks} onChange={showOnlyMyPacks}/>
                <button  onClick={handleClickAddPack}>Add Pack</button>
            </div>
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
                                     loginedUserID = {loginedUserID}
                                     pack={pack}
                                     open={true}
                                     delete={handleClickDeletePack}
                        edit={handleClickEditPack}/>
                    })}</TableBody>
            </Table>
            </div>
                <Pagenator currentPage={page} countItemsOnPage={pageCount} totalItems={cardPacksTotalCount}
                           onPageChanged={onPageChanged}
                           countItemsOnPageChanged={countItemsChanged}/>
        </PaperContainer>
    );
};

export default compose(withAuthRedirect)(PacksTable);

function valuetext(value: number) {
    return `${value}°C`;
}