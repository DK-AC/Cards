import React, {ChangeEvent, useEffect, useState} from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";
import {useDispatch} from "react-redux";
import {addPackTC, PackType, setPacksAT} from "../../../bll/reducers/packReducer";
import {useAppSelector} from "../../../bll/store";
import {setAppErrorAC} from "../../../bll/reducers/appReducer";
import style from './PacksTablePage.module.css'
import {useDebounce} from "../../ReusableComponents/UseDebounce";
import {ParamsPackType} from '../../../dal/packsApi';
import {Modal} from "../../ReusableComponents/Modal/Modal";
import {AddPack} from "../../ReusableComponents/Modal/PacksModals/AddPack";
import SettingsPacks from "./settingsPacks/SettingsPacks";
import PacksTable from "./PacksTable/PacksTable";
import Paper from "@mui/material/Paper";


const PacksTablePage = () => {

    const dispatch = useDispatch()

    const userId = useAppSelector<string>(state => state.Profile._id) //
   const packs = useAppSelector<Array<PackType>>(state => state.Packs.cardPacks) //
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)

    //локальные стейты
    //для инпута (чтоб найти имя колоды)
    const [packName, setPackName] = useState<string>('')
    //для слайдера
    const [sliderValue, setSliderValue] = useState<number[]>([1, 100])  //для первоночальной отрисовки 1, а не 0, чтоб не показывать пустые колоды
    //моя или нет колода
    const [myPacks, setMyPacks] = useState<boolean>(true)
    const user_id = myPacks ? userId : ''


    //задержки от лишних запросов на сервер
    const debouncedPackName = useDebounce(packName, 500)
    const debouncedMin = useDebounce(sliderValue[0], 500)
    const debouncedMax = useDebounce(sliderValue[1], 500)

    //локал стейты для пагинатора
    const [currentPage, setCurrentPage] = useState<number>(1)  //какая страница выбрана
    const [pageCount, setPageCount] = useState<number>(5)  // сколько колод на старице

    //модалки
    const [addModal, setAddModal] = useState(false);

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
    }, [dispatch, debouncedPackName, debouncedMin, debouncedMax, myPacks, currentPage, pageCount, packName, isInitialized,addPackTC])

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

        //обработчики для пагинации
        const onPageChanged = (page: number) => setCurrentPage(page)
        const countItemsChanged = (pageCount: number) => setPageCount(pageCount)

    //обработчик для изменения инпута
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => setPackName(e.target.value)

    //обработчик для изменения бегунков слайдера
    const sliderHandler = (event: Event, newValue: number | number[]) => setSliderValue(newValue as number[]);


    //показать только мои колоды
    const showOnlyMyPacks = () => setMyPacks(!myPacks)
        //закрыть модалку
    const closeModal = () => {
        setAddModal(false)
    }

    return (
        <Paper className={style.container}>
            {/*настройки поиска*/}
            <SettingsPacks
                           myPacks={myPacks}
                           showOnlyMyPacks={showOnlyMyPacks}
                           handleClickAddPack={handleClickAddPack}
                           sliderValue={sliderValue}
                           sliderHandler={sliderHandler}
                           packName={packName} onChangeSearch={onChangeSearch} />
            {/*таблица*/}
            <PacksTable  packs={packs}
                        params={params}
                        onPageChanged={onPageChanged}
                        countItemsChanged={countItemsChanged}
            />

            <Modal isOpen={addModal}  closeModal={closeModal}>
                <AddPack showAdd={setAddModal} addPack={addPack}/>
            </Modal>
        </Paper>
    );
};

export default compose(withAuthRedirect)(PacksTablePage);

