import React, {MouseEventHandler, useState} from 'react';
import style from "./ProfileInfo.module.css";
import {useAppSelector} from "../../../../bll/store";
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';

import userImg from "../../../../assets/image/user.jpg"
import {Modal} from "../../../ReusableComponents/Modal/Modal";
import {ChangeProfileModal} from "../../../ReusableComponents/Modal/ProfileModals/ChangeProfileModal";

const ProfileInfo = () => {
    const email =  useAppSelector<string>(state => state.Profile.email)
    const name =  useAppSelector<string>(state => state.Profile.name)
    const avatar =  useAppSelector<string>(state => state.Profile.avatar)
    const count = useAppSelector<number>(state => state.Profile.publicCardPacksCount)
    const ava = avatar? avatar : userImg

    const [showButton, setShowButton]= useState<boolean>(false)
    //модалки
    const [addModal, setAddModal] = useState(false);

    const MouseOverHandler:MouseEventHandler<HTMLDivElement> = (e) => {
        setShowButton(true)
    }
    const onMouseOutHandler:MouseEventHandler<HTMLDivElement> = (e) => {
        setShowButton(false)
    }
    const onClickHandler=()=>{
        setAddModal(true)
        setShowButton(false)
}

const closeModal = () => {
    setAddModal(false)
    console.log(addModal)
}


    return (
        <div className={style.profile} onMouseOver={MouseOverHandler} onMouseOut={onMouseOutHandler} onClick={onClickHandler}>
            {showButton && <div className={style.icon}><AutoFixHighOutlinedIcon fontSize={ "large"} color={'disabled'}/></div>}
           <img src={ava} alt ='profilePhoto' className={style.image} />
            <span className={style.name}> {name? name: email}</span>
            <span  className={style.aboutMe}> I created {count} Card's Packs </span>

            <ChangeProfileModal name={name} avatar={ava} email={email} myProfile={true} isOpen={addModal} changeIsOpen={closeModal} />
        </div>
    );
};

export default ProfileInfo;