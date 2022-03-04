import {Input} from "@mui/material";
import s from './Search.module.css'
import {ChangeEvent} from "react";

export const Search = ({searchValue, onChangeSearch, placeholder = 'Search', ...props}: SearchType) => {
    return (
        <Input
            value={searchValue}
            className={s.input}
            placeholder={placeholder}
            onChange={onChangeSearch}
        />
    );
}

type SearchType = {
    searchValue: string
    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}