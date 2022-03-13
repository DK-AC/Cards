import React from 'react';
import style from "./Loading.module.css";
import {CircularProgress} from "@mui/material";
import {RequestStatusType} from "../../../bll/reducers/appReducer";
import {useAppSelector} from "../../../bll/store";


const Loading = () => {
    const status = useAppSelector<RequestStatusType>(store => store.App.status)
    return (
        <div className={style.loading}>
            {status === 'loading' && <CircularProgress size={'8rem'}/>}
        </div>
    );
};

export default Loading;