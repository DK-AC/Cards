import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './ProfilePage.module.css'
import Paper from "@mui/material/Paper";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PacksTable from "../../Cards/Pack/PacksTable/PacksTable";
import {useAppSelector} from "../../../bll/store";
import {addPackTC, PackType, setPacksAT} from "../../../bll/reducers/packReducer";
import {ParamsPackType} from "../../../dal/packsApi";
import {setAppErrorAC} from "../../../bll/reducers/appReducer";
import {useDispatch} from "react-redux";
import {Slider} from "@mui/material";
import {useDebounce} from "../../ReusableComponents/UseDebounce";
import {Search} from "../../ReusableComponents/Search/Search";





const ProfilePage = () => {

    const dispatch = useDispatch()
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)
    const packs = useAppSelector<Array<PackType>>(state => state.Packs.cardPacks)
    const userProfileID = useAppSelector<string>(state=>state.Profile._id)
    const name =  useAppSelector<string>(state => state.Profile.name)




    const userPacks = packs.filter(p=> p.user_id === userProfileID)


    //локал стейты для пагинатора
    const [currentPage, setCurrentPage] = useState<number>(1)  //какая страница выбрана
    const [pageCount, setPageCount] = useState<number>(5)  // сколько колод на старице
    //обработчики для пагинации
    const onPageChanged = (page: number) => setCurrentPage(page)
    const countItemsChanged = (pageCount: number) => setPageCount(pageCount)


    //для слайдера
    const [sliderValue, setSliderValue] = useState<number[]>([0, 100])
    //обработчик для изменения бегунков слайдера
    const sliderHandler = (event: Event, newValue: number | number[]) => setSliderValue(newValue as number[]);

    //для инпута (чтоб найти имя колоды)
    const [packName, setPackName] = useState<string>('')
    //обработчик для изменения инпута
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => setPackName(e.target.value)

    //задержки от лишних запросов на сервер
    const debouncedMin = useDebounce(sliderValue[0], 500)
    const debouncedMax = useDebounce(sliderValue[1], 500)
    const debouncedPackName = useDebounce(packName, 500)

    const title = name!=='' ? `Packs list of ${name}` : `My Packs list`

    const params: ParamsPackType={
        packName,
        min: sliderValue[0],
        max: sliderValue[1],
        page: currentPage,
        pageCount,
        user_id:userProfileID  //передаем id человека, чью колоду показать
    }

    useEffect(() => {
        dispatch(setAppErrorAC(null))
        isInitialized && dispatch(setPacksAT(params))
    }, [dispatch, currentPage, pageCount, isInitialized, debouncedMin,debouncedMax,debouncedPackName])


    return (
        <Paper className={style.container}>
            <div className={style.leftMenu}>
                <ProfileInfo />
                <div className={style.settingMenu}>
                    <span className={style.text}>Number of cards</span>
                    <Slider value={sliderValue}
                            onChange={sliderHandler}
                            getAriaLabel={() => 'Temperature range'}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            color="secondary"/>
                </div>
            </div>

            <div className={style.main}>
                <div className={style.headBlock}>
                    <h2 className={style.header}>{title}</h2>
                    <Search searchValue={packName} onChangeSearch={onChangeSearch}/>
                </div>
                <div className={style.mainContent}>
                    <PacksTable params={params}
                               onPageChanged={onPageChanged}
                               countItemsChanged={countItemsChanged}
                               packs={userPacks}/>
                </div>
            </div>
        </Paper>
    );
};

export default ProfilePage;

function valuetext(value: number) {
    return `${value}°C`;
}