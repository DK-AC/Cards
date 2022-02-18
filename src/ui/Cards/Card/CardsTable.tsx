import React, {useEffect, useState} from 'react';
import style from "../Card/CardsTable.module.css";
import {TableBody, TableHead} from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Pagenator from "../../ReusableComponents/Pagenator/Pagenator";
import PaperContainer from "../../ReusableComponents/PaperContainer/PaperContainer";
import {useDispatch} from "react-redux";
import {setAppErrorAC} from "../../../bll/reducers/appReducer";
import {addCardTC, CardType, changeCardTC, deleteCardTC, setCardsTC} from "../../../bll/reducers/cardReducer";
import {useAppSelector} from "../../../bll/store";
import Card from "./Card";
import {useNavigate, useParams} from "react-router-dom";
import {ReusableButton} from '../../ReusableComponents/ReusableButton/ReusableButton';
import {CardFromServerType} from "../../../dal/cardsApi";
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";
import {PATH} from "../../Routes/Routes";

const CardsTable = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {id} = useParams<{ id: string }>();

    const cards = useAppSelector<Array<CardType>>(state => state.Cards.cards)
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)
    const cardsTotalCount = useAppSelector<number>(state => state.Cards.cardsTotalCount)

    const [currentPage, setCurrentPage] = useState<number>(1)  //какая страница выбрана
    const [pageCount, setPageCount] = useState<number>(5)  // сколько колод на старице


    const params = {
        cardsPack_id: id,
        page: currentPage,
        pageCount: pageCount
    }

    useEffect(() => {
        dispatch(setAppErrorAC(null))
        isInitialized && dispatch(setCardsTC(params))
    }, [dispatch, cardsTotalCount, pageCount, currentPage])

    const handleClickAddCard = () => {
        dispatch(addCardTC(params, {cardsPack_id: id}))
        dispatch(setCardsTC(params))
    }
    const handleClickDeleteCard = (cardId: string) => {
        dispatch(deleteCardTC(cardId, params))
        dispatch(setCardsTC(params))
    }
    const handleClickEditCard = (cardId: string, model: CardFromServerType) => {
        dispatch(changeCardTC(cardId, model, params))
    }

//обработчики для пагинации
    const onPageChanged = (page: number) => setCurrentPage(page)
    const countItemsChanged = (pageCount: number) => setPageCount(pageCount)


    const handleBackPack = () => {
        navigate(PATH.PACKS_TABLE_PAGE)
    }
    return (
        <PaperContainer title={`My Card's list`} tableStyle={true}>
            <div className={style.callSettingsMenu}>
                <ReusableButton title={'Add Card'}
                                onClickHandler={handleClickAddCard}
                                size={'small'}
                                color={'secondary'}
                />

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
                       countItemsOnPageChanged={countItemsChanged}/>
            <div>
                <ReusableButton title={'Back'}
                                onClickHandler={handleBackPack}
                                size={'small'}
                                color={'error'}
                />
            </div>
        </PaperContainer>
    );
};

export default compose(withAuthRedirect)(CardsTable);

