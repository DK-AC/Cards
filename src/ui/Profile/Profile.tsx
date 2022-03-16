import React from 'react';
import {withAuthRedirect} from "../../bll/HOK/withAuthRedirect";
import {compose} from "redux";
import {useAppSelector} from "../../bll/store";
import {RequestStatusType} from "../../bll/reducers/appReducer";
import userImg from "../../assets/image/user.jpg"
import styles from "./Profile.module.css"

const Profile = () => {

    const status = useAppSelector<RequestStatusType>(state => state.App.status)
    const isLoggedIn = useAppSelector<boolean>(state => state.App.isInitialized)
    const email = useAppSelector<string>(state => state.Profile.email)

    /*if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN_PAGE}/>;
    }*/

    return (
                <div>
                    {/*status === 'loading'
           ? <CircularProgress size={'8rem'}/>:*/}
                    <section>
                        <div className={styles.wrapper}>
                            <h1 className={styles.title}>Profile</h1>
                            <img className={styles.image} src={userImg} alt="avatar"/>
                            <div className={styles.email}>Email: {email}</div>
                        </div>
                    </section>
                </div>

    );
};

export default compose(withAuthRedirect)(Profile);
