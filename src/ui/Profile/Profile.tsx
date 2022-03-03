import React from 'react';
import {PATH} from "../Routes/Routes";
import {Navigate, NavLink} from "react-router-dom";
import {withAuthRedirect} from "../../bll/HOK/withAuthRedirect";
import {compose} from "redux";
import {useAppSelector} from "../../bll/store";
import {RequestStatusType} from "../../bll/reducers/appReducer";
import userImg from "../../assest/image/user.jpg"
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Profile.module.css"

const Profile = () => {

    const status = useAppSelector<RequestStatusType>(state => state.App.status)
    const isLoggedIn = useAppSelector<boolean>(state => state.App.isInitialized)
    const email = useAppSelector<string>(state => state.Profile.email)

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN_PAGE}/>;
    }

    return (
        <>
            {status === 'loading'
                ? <CircularProgress size={'8rem'}/>
                : <div>
                    <section>
                        <div className={styles.wrapper}>
                            <h1 className={styles.title}>Profile</h1>
                            <img className={styles.image} src={userImg} alt="avatar"/>
                            <div className={styles.email}>Email: {email}</div>
                            <NavLink to={PATH.PACKS_TABLE_PAGE}> PAKC's </NavLink>
                        </div>
                    </section>
                </div>}
        </>
    );
};

export default compose(withAuthRedirect)(Profile);
