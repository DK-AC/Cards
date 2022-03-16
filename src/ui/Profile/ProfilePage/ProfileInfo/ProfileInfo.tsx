import React, {MouseEventHandler, useState} from 'react';
import style from "./ProfileInfo.module.css";
import {useAppSelector} from "../../../../bll/store";
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import userImg from "../../../../assets/image/user.jpg"
import {ChangeProfileModal} from "../../../ReusableComponents/Modal/ProfileModals/ChangeProfileModal";


const ProfileInfo = () => {
    const email = useAppSelector<string>(state => state.Profile.email)
    const name = useAppSelector<string>(state => state.Profile.name)
    const avatar = useAppSelector<string>(state => state.Profile.avatar)
    const count = useAppSelector<number>(state => state.Profile.publicCardPacksCount)

    const ava = avatar ? avatar : userImg

    const [showButton, setShowButton] = useState<boolean>(false)


    const MouseOverHandler: MouseEventHandler<HTMLDivElement> = (e) => {
        setShowButton(true)
    }
    const onMouseOutHandler: MouseEventHandler<HTMLDivElement> = (e) => {
        setShowButton(false)
    }

//модалки
    const [addModal, setAddModal] = useState(false);
    const onClickHandler = () => {setAddModal(true)}
    const closeModal = () => {setAddModal(false)}



return (
    <>
        <div className={style.profile} onMouseOver={MouseOverHandler} onMouseOut={onMouseOutHandler}
             onDoubleClick={onClickHandler}>
            {showButton &&
                <div className={style.icon}><AutoFixHighOutlinedIcon fontSize={"medium"} color={'disabled'}/></div>}
            <img src={ava} alt='profilePhoto' className={style.image}/>
            <span className={style.name}> {name ? name : email}</span>
            <span className={style.aboutMe}> I created {count} Card's Packs </span>
        </div>
        <ChangeProfileModal name={name}
                            avatar={ava}
                            email={email}
                            myProfile={true}
                            isOpen={addModal}
                            closeModal={closeModal}/>
    </>
);
}
;

export default ProfileInfo;