import React, {ChangeEvent} from 'react';
import style from "./SettingsCards.module.css";
import Button from "@mui/material/Button";
import {ArrowBack} from "@mui/icons-material";
import {Search} from "../../../ReusableComponents/Search/Search";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {useAppSelector} from "../../../../bll/store";
import {RequestStatusType} from "../../../../bll/reducers/appReducer";
import {PATH} from "../../../Routes/Routes";
import {useNavigate} from "react-router-dom";

type propsType ={
    question:string
    onChangeSearch:(e: ChangeEvent<HTMLInputElement>)=>void
    handleClickAddCard: ()=>void
}

const CardSetting = ({question,...props}:propsType) => {
    const status = useAppSelector<RequestStatusType>(store => store.App.status)

    const navigate = useNavigate()
    //назад к пакам
    const handleBackPack = () => {
        navigate(PATH.PACKS_TABLE_PAGE)
    }

    return (
        <div className={style.settingsMenu}>
            <Button variant="outlined"
                    color={'inherit'}
                    size={"small"}
                    disabled={status === 'loading'}
                    startIcon={<ArrowBack/>}
                    onClick={handleBackPack}
            >
                Back
            </Button>
            <Search placeholder={'Search by question'}
                    searchValue={question}
                    onChangeSearch={props.onChangeSearch}
            />
            <Button variant="outlined"
                    color={'secondary'}
                    size={"small"}
                    disabled={status === 'loading'}
                    startIcon={<ControlPointIcon/>}
                    onClick={props.handleClickAddCard}
            >
                Add Card
            </Button>
        </div>
    );
};

export default CardSetting;