import React from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../../../bll/HOK/withAuthRedirect";

const PacksTable = () => {
    return (
        <div>
            ghgghh
        </div>
    );
};

export default compose(withAuthRedirect)(PacksTable);
