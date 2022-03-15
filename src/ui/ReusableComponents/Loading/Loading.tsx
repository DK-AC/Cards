import React from 'react';
import style from "./Loading.module.css";
import {CircularProgress} from "@mui/material";
import {RequestStatusType} from "../../../bll/reducers/appReducer";
import {useAppSelector} from "../../../bll/store";


const Loading = () => {
    const status = useAppSelector<RequestStatusType>(store => store.App.status)
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)
    return (
        <div className={style.loading}>
            {isInitialized && status === 'loading' && <CircularProgress size={'8rem'}/>}
            {!isInitialized && <CircularProgress size={'8rem'} />}
        </div>
    );
};

export default Loading;