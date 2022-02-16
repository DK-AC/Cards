import React from 'react';
import {useAppSelector} from "../../bll/store";
import {PATH} from "../Routes/Routes";
import {NavLink, useNavigate} from "react-router-dom";
import {withAuthRedirect} from "../../bll/HOK/withAuthRedirect";
import {compose} from "redux";

 const Profile = () => {
  /* const isLoggedIn = useAppSelector<boolean>(state => state.Login.isLogged)
    const navigate = useNavigate()


    if (!isLoggedIn) navigate(PATH.LOGIN_PAGE)*/

    return (<div>
            Profile
            <NavLink to={PATH.PACKS_TABLE_PAGE}> PAKC's </NavLink>
        </div>
    );
};

export default compose(withAuthRedirect)(Profile);
/*export default Profile;*/
