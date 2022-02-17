import React, {ChangeEvent, useEffect, useState} from 'react';
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
import {setAppErrorAC} from "../../../bll/reducers/appReducer";
import {CardType, setCardsTC} from "../../../bll/reducers/cardReducer";
import {useAppSelector} from "../../../bll/store";
import {useDebounce} from "../../ReusableComponents/UseDebounce";
import Card from "./Card";

const CardsTable = () => {
    const dispatch = useDispatch()
    const cards = useAppSelector<Array<CardType>>(state => state.Cards.cards)
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)
    const userId = useAppSelector<string>(state => state.Profile._id)
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [sliderValue, setSliderValue] = useState<number[]>([0, 9])
    const [myCards, setMyCards] = useState<boolean>(false)
    const debouncedQuestion = useDebounce(question, 500)
    const debouncedAnswer = useDebounce(answer, 500)
    const debouncedMin = useDebounce(sliderValue[0], 500)
    const debouncedMax = useDebounce(sliderValue[1], 500)
    const user_id = myCards ? userId : ''
    const loginedUserID = useAppSelector<string>(state=>state.Login.idUser)

    const params = {
        question,
        answer,
        min: sliderValue[0],
        max: sliderValue[1],
        user_id
    }

    useEffect(() => {
        dispatch(setAppErrorAC(null))
        isInitialized && dispatch(setCardsTC(params))
    }, [dispatch, debouncedQuestion, debouncedAnswer, debouncedMin, debouncedMax])

    const handleClickAddCard = () => {

    }
    const sliderHandler = (event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number[]);
    };
    const showOnlyMyCards = () => {
        setMyCards(!myCards)
    }
    const onChangeSearchQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value)
    }
    const onChangeSearchAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value)
    }

    return (
        <PaperContainer title={`My Card's list`} tableStyle={true}>
            <div className={style.callSettingsMenu}>
                <ReusableButton title={'Add Pack'} onClickHandler={() => {
                }} size={'small'}
                                color={'secondary'}/>
                <Search searchValue={question} onChangeSearch={onChangeSearchQuestion}/>
                <Search searchValue={answer} onChangeSearch={onChangeSearchAnswer}/>

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
                        {cards.map((card: CardType) => {
                            return <Card key={`${card.user_id}+${card.created}+${card.question}`}
                                         loginedUserID={loginedUserID}
                                         card={card}
                                         open={true}
                                         delete={()=>{}}
                                         edit={()=>{}}/>
                        })}
                    </TableBody>
                </Table>
            </div>
            <Pagenator currentPage={1} countItemsOnPage={2} totalItems={1000}
                       onPageChanged={() => {
                       }}
                       countItemsOnPageChanged={() => {
                       }}/>
        </PaperContainer>
    );
};

export default CardsTable;

function valuetext(value: number) {
    return `${value}°C`;
}