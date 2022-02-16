import React, {useState} from 'react';
import {InputLabel, NativeSelect, Pagination} from "@mui/material";
import {useDispatch} from "react-redux";



export type pagenatorPropsType ={
    currentPage: number //текущая страница
    countItemsOnPage: number // сколько колод показывать на странице
    totalItems: number // всего колод
    onPageChanged:(page:number)=>void
    countItemsOnPageChanged:(pageCount:number)=>void
}

const Pagenator = ({currentPage, countItemsOnPage,totalItems,...props}:pagenatorPropsType ) => {
    const dispatch = useDispatch()

   //количество отображаемых страниц
   const PageCount =  Math.ceil(totalItems/ countItemsOnPage)

    const [page, setPage] = useState(currentPage)

    // сохраняем выделенную страницу для визуального отображения
    // + передаем выбранную страницу к родителю для запросов на сервер
    const handleChangePage =(e: React.ChangeEvent<unknown>, page: number)=>{
       setPage(page)
        props.onPageChanged(page)
    }
    // выбираем в селекторе размер страницы и шлем его родителю
    const handleChangecountItemsOnPage=(event: React.ChangeEvent<HTMLSelectElement>)=>{
        props.countItemsOnPageChanged(+event.target.value)
    }

    return (
        <div>
            <Pagination count={PageCount} page={page} onChange={handleChangePage}
                        variant="outlined" shape="rounded"  color="secondary"  />
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                <span>Pack's number per page: </span>
                <NativeSelect onChange ={handleChangecountItemsOnPage}
                              defaultValue={countItemsOnPage}
                              inputProps={{
                                  name: 'countItemsOnPage',
                                  id: 'uncontrolled-native',
                              }}>
                    <option value={5}> 5 </option>
                    <option value={10}> 10 </option>
                    <option value={15}> 15 </option>
                    <option value={50}> 50 </option>
                </NativeSelect>
            </InputLabel>
        </div>
    );
};

export default Pagenator;