import React, {ChangeEvent, useEffect, useState} from 'react';
import style from "../Card/CardsTable.module.css";
import {TableBody, TableHead} from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Pagenator from "../../ReusableComponents/Pagenator/Pagenator";
import {useDispatch} from "react-redux";
import {RequestStatusType, setAppErrorAC} from "../../../bll/reducers/appReducer";
import {addCardTC, CardType, changeCardTC, deleteCardTC, setCardsTC} from "../../../bll/reducers/cardReducer";
import {useAppSelector} from "../../../bll/store";
import Card from "./Card";
import {useNavigate, useParams} from "react-router-dom";
import {CardFromServerType, cardsFromUserForCreatingType, ParamsCardType} from "../../../dal/cardsApi";
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";
import {PATH} from "../../Routes/Routes";
import {Search} from "../../ReusableComponents/Search/Search";
import {useDebounce} from "../../ReusableComponents/UseDebounce";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Button from "@mui/material/Button";
import {ArrowBack} from "@mui/icons-material";
import {Modal} from "../../ReusableComponents/Modal/Modal";
import {AddCard} from "../../ReusableComponents/Modal/CardsModals/AddCard";
import {DeleteModal} from "../../ReusableComponents/Modal/DeleteModal";
import {UpdateCard} from "../../ReusableComponents/Modal/CardsModals/UpdateCard";

const CardsTable = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //получаю id из url
    const {id} = useParams<{ id: string }>();

    const status = useAppSelector<RequestStatusType>(store => store.App.status)
    const cards = useAppSelector<Array<CardType>>(state => state.Cards.cards)
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)
    const cardsTotalCount = useAppSelector<number>(state => state.Cards.cardsTotalCount)

    //локальные стейты
    //для инпута (чтоб найти вопросы и ответы)
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    //для пагинации
    const [currentPage, setCurrentPage] = useState<number>(1)  //какая страница выбрана
    const [pageCount, setPageCount] = useState<number>(5)  // сколько колод на старице

    //задержки от лишних запросов на сервер
    const debouncedQuestion = useDebounce(question, 500)
    const debouncedAnswer = useDebounce(answer, 500)

    // хранение id карточки для модалки
    const [cardId, setCardId] = useState('')
    // хранение значения полей ввода для редактирования
    const [card, setCard] =  useState<CardFromServerType>({})

    //модалки
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);


    const params: ParamsCardType = {
        cardsPack_id: id,
        page: currentPage,
        pageCount: pageCount
    }

    useEffect(() => {
        dispatch(setAppErrorAC(null))
        isInitialized && dispatch(setCardsTC(params))
    }, [dispatch, pageCount, currentPage, debouncedQuestion])

    //обработчики колод (добавление, удаление, изменение)
    const handleClickAddCard = () => {
        setAddModal(true)
    }
    const addCard = (cardsData: cardsFromUserForCreatingType) =>{
        dispatch(addCardTC(params, cardsData))
        setAddModal(false)
    }
    const handleClickDeleteCard = (cardId: string) => {
        setCardId(cardId)
        setDeleteModal(true)
    }
    const deleteCard =()=>{
        dispatch(deleteCardTC(cardId, params))
        setDeleteModal(false);
    }
    const handleClickEditCard = (cardId: string, card: CardFromServerType) => {
        setCardId(cardId)
        setCard(card)
        setUpdateModal(true)
    }
    const editCard =(card:CardFromServerType)=>{
        dispatch(changeCardTC(cardId, card, params))
        setUpdateModal(false)
    }

    //обработчики для пагинации
    const onPageChanged = (page: number) => setCurrentPage(page)
    const countItemsChanged = (pageCount: number) => setPageCount(pageCount)

    //обработчик для изменения инпута
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)

    //назад к пакам
    const handleBackPack = () => {
        navigate(PATH.PACKS_TABLE_PAGE)
    }
    return (
        <div className={style.container}>
            <div className={style.settingsMenu}>
                <Button variant="outlined"
                        color={'inherit'}
                        size={"small"}
                        disabled={status === 'loading'}
                        startIcon={<ArrowBack/>}
                        onClick={handleBackPack}>
                    Back
                </Button>
                <Search searchValue={question} onChangeSearch={onChangeSearch}/>
                <Button variant="outlined"
                        color={'secondary'}
                        size={"small"}
                        disabled={status === 'loading'}
                        startIcon={<ControlPointIcon/>}
                        onClick={handleClickAddCard}>
                    Add Card
                </Button>
            </div>
            <div className={style.Table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell variant="head">Question</TableCell>
                            <TableCell variant="head">Answer</TableCell>
                            <TableCell variant="head">Last Updated</TableCell>
                            <TableCell variant="head">Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map((card: CardType) => {
                            return <Card key={`${card.user_id}+${card.created}+${card.updated}`}
                                         card={card}
                                         delete={handleClickDeleteCard}
                                         edit={handleClickEditCard}
                            />
                        })}
                    </TableBody>
                </Table>
            </div>
            <Pagenator currentPage={currentPage}
                       countItemsOnPage={pageCount}
                       totalItems={cardsTotalCount}
                       onPageChanged={onPageChanged}
                       countItemsOnPageChanged={countItemsChanged}
            />
            {/*//modal*/}
            <Modal isOpen = {deleteModal}>
                <DeleteModal showDelete={setDeleteModal} deleteFunction={deleteCard} />
            </Modal>
            <Modal isOpen={addModal}>
                <AddCard showAdd={setAddModal} addCard={addCard} cardsPack_id={id} />
            </Modal>
            <Modal isOpen = {updateModal}>
             <UpdateCard showUpdate={setUpdateModal} updateCard={editCard} answer={card.answer} question={card.question}/>
            </Modal>
        </div>
    );
};

export default compose(withAuthRedirect)(CardsTable);

