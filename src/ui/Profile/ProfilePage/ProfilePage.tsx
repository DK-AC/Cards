import React from 'react';
import style from './ProfilePage.module.css'
import Paper from "@mui/material/Paper";
import ProfileInfo from "./ProfileInfo";


const ProfilePage = () => {


    return (
        <Paper className={style.container}>
            <div className={style.leftMenu}>
                <ProfileInfo />
                <div>settings</div>
            </div>
            <div> table </div>

        </Paper>
    );
};

export default ProfilePage;