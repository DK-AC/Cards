import React, {useEffect, useState} from 'react';
import style from "../Card/CardsTable.module.css";
import {ReusableButton} from "../../ReusableComponents/ReusableButton/ReusableButton";
import {Search} from "../../ReusableComponents/Search/Search";
import {Slider, Switch, TableBody, TableHead} from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Pagenator from "../../ReusableComponents/Pagenator/Pagenator";
import PaperContainer from "../../ReusableComponents/PaperContainer/PaperContainer";
import {useDispatch} from "react-redux";

const CardsTable = () => {

    const dispatch = useDispatch()
    const [sliderValue, setSliderValue] = useState<number[]>([0,9])
    const [myCards, setMyCards] = useState<boolean>(false)

    useEffect(() => {
    }, [])

    const handleClickAddCard = () => {

    }
    const sliderHandler = (event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number[]);
    };
    const showOnlyMyCards = () => {
        setMyCards(!myCards)
    }

    return (
        <PaperContainer title={`My Card's list`} tableStyle={true}>
            <div className={style.callSettingsMenu}>
                <ReusableButton title={'Add Pack'} onClickHandler={() => {
                }} size={'small'}
                                color={'secondary'}/>
                <Search searchValue={'packName'} onChangeSearch={() => {
                }}/>

                <Slider value={sliderValue}
                        onChange={sliderHandler}
                        getAriaLabel={() => 'Temperature range'}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}/>
                <Switch checked={myCards} onChange={showOnlyMyCards}/>
                <button onClick={handleClickAddCard}>Add Pack</button>
            </div>
            <div className={style.Table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell variant="head">Answer</TableCell>
                            <TableCell variant="head">Last Updated</TableCell>
                            <TableCell variant="head">Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/*{packs.map((pack: PackType) => {*/}
                        {/*    return <Card key={`${pack.user_id}+${pack.created}+${pack.name}`}*/}
                        {/*                 loginedUserID={loginedUserID}*/}
                        {/*                 card={pack}*/}
                        {/*                 open={true}*/}
                        {/*                 delete={handleClickDeletePack}*/}
                        {/*                 edit={handleClickEditPack}/>*/}
                        {/*})}*/}
                    </TableBody>
                </Table>
            </div>
            <Pagenator currentPage={1} countItemsOnPage={2} totalItems={1000}
                       onPageChanged={()=>{}}
                       countItemsOnPageChanged={()=>{}}/>
        </PaperContainer>
    );
};

export default CardsTable;

function valuetext(value: number) {
    return `${value}°C`;
}