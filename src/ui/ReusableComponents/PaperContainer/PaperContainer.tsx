import React from 'react';
import {useAppSelector} from "../../../bll/store";
import {RequestStatusType} from "../../../bll/reducers/appReducer";
import Paper from '@mui/material/Paper';
import style from './PaperContainer.module.css'
import {CircularProgress} from "@mui/material";


type propsType ={
    children: React.ReactNode
    title?:string
    tableStyle?:boolean
}

 const PaperContainer = ({children, title, tableStyle} :propsType) => {
 const status = useAppSelector<RequestStatusType>(store=> store.App.status)
  const styleVariant = tableStyle? `${style.paperContainer} ${style.table}` :style.paperContainer
  const styleContentVariant = tableStyle? `${style.content} ${style.tableContent}` :style.content
    return (
        <Paper elevation={3} className={styleVariant}>
         <h3 className={style.additionalTitle}>it-incubator</h3>
                <h2 className={style.mainTitle}> {title} </h2>
                <div className={style.content}>{children}</div>
            {status=== 'loading' &&  <CircularProgress />}
        </Paper>
    );
};
export default PaperContainer;