import React from 'react';
import {Pagination} from "@mui/material";

export type pagenatorPropsType ={
    currentPage: number
   countItemsOnPage: number
    totalItems: number
}

const Pagenator = (props:pagenatorPropsType ) => {
    return (
        <div>
          {/*  Pagination
            <select>
                <option key={1} value={1} >1</option>
                <option key={2} value={2} >2</option>
            </select>*/}
            <Pagination count={10} variant="outlined" shape="rounded"  color="primary"  />
          {/*  <button> &lt; </button>
            1 2 3 4 5
            <button> &gt; </button>*/}
        </div>
    );
};

export default Pagenator;