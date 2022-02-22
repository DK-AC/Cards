import React from 'react';
import {useAppSelector} from "../../../bll/store";
import {RequestStatusType} from "../../../bll/reducers/appReducer";
import Paper from '@mui/material/Paper';
import style from './PaperContainer.module.css'
import {CircularProgress} from "@mui/material";


type propsType ={
    children: React.ReactNode
    title?:string
    isCard?:boolean
}

 const PaperContainer = ({children, title, isCard} :propsType) => {
 const status = useAppSelector<RequestStatusType>(store=> store.App.status)
  const contentStyle = isCard ? `${style.content} ${style.card}`: style.content

    return (
        <Paper elevation={3} className={style.paperContainer}>
         <h3 className={style.additionalTitle}>it-incubator</h3>
                <h2 className={style.mainTitle}> {title} </h2>
                <div className={contentStyle}>{children}</div>
            {status=== 'loading' &&  <CircularProgress />}
        </Paper>
    );
};
export default PaperContainer;