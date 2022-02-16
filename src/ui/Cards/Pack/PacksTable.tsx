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
    addPackAT,
    changePackTC,
    deletePackAT,
    PackType,
    setPacksAT
} from "../../../bll/reducers/packReducer";
import {useAppSelector} from "../../../bll/store";
import {setAppErrorAC} from "../../../bll/reducers/appReducer";
import Pagenator from "../../ReusableComponents/Pagenator/Pagenator";
import {Search} from "../../ReusableComponents/Search/Search";
import {useDebounce} from "../../ReusableComponents/UseDebounce";



const PacksTable = () => {
    const dispatch = useDispatch()
    const packs = useAppSelector<Array<PackType>>(state => state.Packs)
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)
    const userId = useAppSelector<string>(state=>state.Profile._id)
    const [packName, setPackName] = useState<string>('')
    const [sliderValue, setSliderValue] = useState<number[]>([0,9])
    const [myPacks, setMyPacks] = useState<boolean>(false)
    const debouncedPackName = useDebounce(packName,500)
    const debouncedMin = useDebounce(sliderValue[0],500)
    const debouncedMax = useDebounce(sliderValue[1],500)
    const user_id = myPacks ? userId : ''

    const params = {
        packName,
        min:sliderValue[0],
        max:sliderValue[1],
        user_id
    }

    useEffect(()=>{
        console.log(user_id)
        dispatch(setAppErrorAC(null))
        isInitialized && dispatch(setPacksAT(params))
    }, [dispatch,debouncedPackName,debouncedMin,debouncedMax,myPacks])

    const handleClickAddPack=()=>{
        dispatch(addPackAT(params,'testing name for test because test'))
    }
    const handleClickDeletePack =(packID: string)=>{
        dispatch(deletePackAT(packID,params))
    }
    const handleClickEditPack =(packID: string,model: PackType)=>{
        dispatch(changePackTC(packID, model,params))
    }
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
        <div>
            <Search searchValue={packName} onChangeSearch={onChangeSearch}/>

            <Slider value={sliderValue}
                    onChange={sliderHandler}
                    getAriaLabel={() => 'Temperature range'}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}/>
            <Switch checked={myPacks} onChange={showOnlyMyPacks}/>
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

function valuetext(value: number) {
    return `${value}°C`;
}