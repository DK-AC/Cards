import {Input} from "@mui/material";
import s from './Search.module.css'
import {ChangeEvent} from "react";

export const Search = ({searchValue, onChangeSearch,...props}:SearchType) => {
    return (
        <Input
            value={searchValue}
            className={s.input}
            placeholder="Search"
            onChange={onChangeSearch}
        />
    );
}

type SearchType = {
    searchValue:string
    onChangeSearch:(e:ChangeEvent<HTMLInputElement>)=>void
}