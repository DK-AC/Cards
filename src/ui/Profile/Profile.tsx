import React from 'react';
import {useAppSelector} from "../../bll/store";
import {PATH} from "../Routes/Routes";
import {useNavigate} from "react-router-dom";
import {withAuthRedirect} from "../../bll/HOK/withAuthRedirect";
import {compose} from "redux";

 const Profile = () => {
   /* const isLoggedIn = useAppSelector<boolean>(state => state.Login.isLogged)
    const navigate = useNavigate()


    if (!isLoggedIn) navigate(PATH.LOGIN_PAGE)*/

    return (<div>
            Profile
        </div>
    );
};

export default compose(withAuthRedirect)(Profile);
