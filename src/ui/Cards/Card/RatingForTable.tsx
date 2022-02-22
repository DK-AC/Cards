import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import {yellow} from "@mui/material/colors";
import {v1} from "uuid";
import style from './CardsTable.module.css'

type RatingForTableType ={
    grade: number
}

const RatingForTable = ({grade}:RatingForTableType) => {
    let fullStar = Math.round(grade)
    let arr=[]

    while( arr.length !=5){
        if(fullStar>0){
            arr.push(true)
        }else{
            arr.push(false)
        }
        fullStar--
    }


    return (
        <div className={style.icons}>
            {arr.map(a=>a? <StarIcon fontSize="small"  sx={{ color: yellow[500] }}  key={v1()}/>:
                <StarBorderIcon fontSize="small"  color="secondary" key={v1()}/> )}
        </div>
    );
};

export default RatingForTable;