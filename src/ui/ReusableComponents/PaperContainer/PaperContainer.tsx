import React from 'react';
import {useAppSelector} from "../../../bll/store";
import {RequestStatusType} from "../../../bll/reducers/appReducer";
import Paper from '@mui/material/Paper';
import style from './PaperContainer.module.css'
import {CircularProgress} from "@mui/material";


type propsType ={
    children: React.ReactNode
    title:string
}

 const PaperContainer = ({children, title} :propsType) => {
 const status = useAppSelector<RequestStatusType>(store=> store.App.status)

    return (
        <Paper elevation={3} className={style.paperContainer}>
         <h3 className={style.additionalTitle}>it-incubator</h3>
                {status === 'loading' && <div>Load</div>}
                <h2 className={style.mainTitle}> {title} </h2>
                <div className={style.content}>{children}</div>
            {status=== 'loading' &&  <CircularProgress />}

        </Paper>
    );
};
export default PaperContainer;