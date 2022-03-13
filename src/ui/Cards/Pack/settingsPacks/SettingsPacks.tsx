import React, {ChangeEvent} from 'react';
import style from "./SettingsPacks.module.css";
import {Slider, Switch} from "@mui/material";
import Button from "@mui/material/Button";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {Search} from "../../../ReusableComponents/Search/Search";
import {useAppSelector} from "../../../../bll/store";
import {RequestStatusType} from "../../../../bll/reducers/appReducer";


function valuetext(value: number) {
    return `${value}°C`;
}

type propsType={
    myPacks: boolean
    showOnlyMyPacks: ( myPacks: boolean)=>void
    handleClickAddPack: () =>void
    sliderValue: number[]
    sliderHandler: (event: Event, newValue: number | number[]) => void
    packName: string
    onChangeSearch:(e: ChangeEvent<HTMLInputElement>)=>void

}

const SettingsPacks = ({myPacks,sliderValue,packName,...props}: propsType) => {
    const status = useAppSelector<RequestStatusType>(store => store.App.status)
    //показать только мои колоды
    const showOnlyMyPacksHandler = () => props.showOnlyMyPacks(!myPacks)


    return (
        <div className={style.settingsMenu}>
            <div className={style.column}>
                <span className={style.text}>Filter All / My Packs</span>
                <div className={style.secondText}>All<Switch checked={myPacks} onChange={showOnlyMyPacksHandler}/> My</div>
                <Button variant="outlined" color={'secondary'} disabled={status === 'loading'}
                        startIcon={<ControlPointIcon/>}
                        onClick={props.handleClickAddPack}>
                    Add Pack
                </Button>

            </div>
            <div className={style.column}>
                <span className={style.text}>Number of cards</span>
                <Slider sx={{width:170}}
                    value={sliderValue}
                        onChange={props.sliderHandler}
                        getAriaLabel={() => 'Temperature range'}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}/>
                <Search searchValue={packName} onChangeSearch={ props.onChangeSearch}/>
            </div>
        </div>
    );
};

export default SettingsPacks;