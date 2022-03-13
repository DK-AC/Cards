import React from 'react';
import style from "./ProfileInfo.module.css";
import {useAppSelector} from "../../../../bll/store";

import userImg from "../../../../assets/image/user.jpg"

const ProfileInfo = () => {
    const email =  useAppSelector<string>(state => state.Profile.email)
    const name =  useAppSelector<string>(state => state.Profile.name)
    const avatar =  useAppSelector<string>(state => state.Profile.avatar)
    const count = useAppSelector<number>(state => state.Profile.publicCardPacksCount)
    const ava = avatar? avatar : userImg

    return (
        <div className={style.profile}>
           <img src={ava} alt ='profilePhoto' className={style.image} />
            <span className={style.name}> {name? name: email}</span>
            <span  className={style.aboutMe}> I created {count} Card's Packs </span>
        </div>
    );
};

export default ProfileInfo;