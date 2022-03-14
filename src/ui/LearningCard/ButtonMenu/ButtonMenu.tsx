import React, {Component} from 'react';
import style from "./ButtonMenu.module.css";
import {Button} from "@mui/material";
import {ArrowBack, SvgIconComponent} from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {useAppSelector} from "../../../bll/store";
import {RequestStatusType} from "../../../bll/reducers/appReducer";
import {PATH} from "../../Routes/Routes";
import {useNavigate} from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type propsType={
    rightIcon: 'VisibilityIcon'|'ArrowForwardIcon'| string
    handlerClickRightButton:()=>void
    rightButtonName: string
}

const ButtonMenu = ({handlerClickRightButton,rightIcon,rightButtonName,...props}:propsType) => {
    const status = useAppSelector<RequestStatusType>(store => store.App.status)
    const navigate = useNavigate()

    const handlerClickBack = () => {
        navigate(PATH.PACKS_TABLE_PAGE)
    }

    return (
        <div className={style.buttonMenu}>
            <Button variant="outlined"
                    color={'inherit'}
                    size={"small"}
                    disabled={status === 'loading'}
                    startIcon={<ArrowBack/>}
                    onClick={handlerClickBack}>
                Back
            </Button>
            <Button variant="outlined"
                    color={'success'}
                    size={"small"}
                    disabled={status === 'loading'}
                    startIcon={'VisibilityIcon'?<VisibilityIcon/>:<ArrowForwardIcon/> }
                    onClick={handlerClickRightButton}>
                {rightButtonName}
            </Button>
        </div>
    );
};

export default ButtonMenu;