import React, {ChangeEvent, useEffect, useState} from 'react';
import style from "./CardsTablePage.module.css";
import {useDispatch} from "react-redux";
import {RequestStatusType, setAppErrorAC} from "../../../bll/reducers/appReducer";
import {addCardTC, CardType, setCardsTC} from "../../../bll/reducers/cardReducer";
import {useAppSelector} from "../../../bll/store";
import {useNavigate, useParams} from "react-router-dom";
import {CardFromServerType, cardsFromUserForCreatingType, ParamsCardType} from "../../../dal/cardsApi";
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";
import {useDebounce} from "../../ReusableComponents/UseDebounce";
import Button from "@mui/material/Button";
import {Modal} from "../../ReusableComponents/Modal/Modal";
import {AddCard} from "../../ReusableComponents/Modal/CardsModals/AddCard";
import {PackType} from "../../../bll/reducers/packReducer";
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import CardSetting from "./CardSetting/CardSetting";
import CardTable from "./CardTable/CardTable";
import Paper from "@mui/material/Paper";


const CardsTablePage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //получаю id из url
    const {id} = useParams();

    const status = useAppSelector<RequestStatusType>(store => store.App.status)
    const cards = useAppSelector<Array<CardType>>(state => state.Cards.cards)
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)

    const packs = useAppSelector<Array<PackType>>(state => state.Packs.cardPacks)

    //локальные стейты
    //для инпута (чтоб найти вопросы и ответы)
    const [question, setQuestion] = useState<string>('')

    //для пагинации
    const [currentPage, setCurrentPage] = useState<number>(1)  //какая страница выбрана
    const [pageCount, setPageCount] = useState<number>(5)  // сколько колод на старице

    //задержки от лишних запросов на сервер
    const debouncedQuestion = useDebounce(question, 500)


    // хранение значения полей ввода для редактирования
    const [card, setCard] = useState<CardFromServerType>({})

    //модалки
    const [addModal, setAddModal] = useState(false);


    // имя колоды
    const pack = packs.find(p => p._id === id)
    const packName = pack ? pack.name : 'some name'

    const params: ParamsCardType = {
        cardQuestion: question,
        cardsPack_id: id,
        page: currentPage,
        pageCount: pageCount
    }

    useEffect(() => {
        dispatch(setAppErrorAC(null))
        isInitialized && dispatch(setCardsTC(params))
    }, [dispatch, pageCount, currentPage, debouncedQuestion, isInitialized,card])

    //обработчики колод (добавление, удаление, изменение)
    const handleClickAddCard = () => {
        setAddModal(true)
    }
    const addCard = (cardsData: cardsFromUserForCreatingType) => {
        dispatch(addCardTC(params, cardsData))
        setAddModal(false)
    }

    //обработчики для пагинации
    const onPageChanged = (page: number) => setCurrentPage(page)
    const countItemsChanged = (pageCount: number) => setPageCount(pageCount)

    //обработчик для изменения инпута
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)


    //начать учиться
    const handleLearn = () => {
        navigate(`/cards/card/${id}`)
    }

    return (

        <Paper className={style.container}>
           <CardSetting question={question} onChangeSearch={onChangeSearch} handleClickAddCard={handleClickAddCard} />

            <div className={style.titleBlock}>
                <h2 className={style.tableTitle}>Pack's name: {packName}</h2>
                <Button variant="outlined"
                        color={'success'}
                        disabled={status === 'loading'}
                        startIcon={<PlayCircleOutlineOutlinedIcon/>}
                        onClick={handleLearn}
                >
                    Learn
                </Button>
            </div>
           <CardTable cards={cards} params={params} onPageChanged={onPageChanged} countItemsChanged={countItemsChanged} />

            <Modal isOpen={addModal}>
                <AddCard showAdd={setAddModal} addCard={addCard} cardsPack_id={id}/>
            </Modal>

        </Paper>
    );
};

export default compose(withAuthRedirect)(CardsTablePage);

