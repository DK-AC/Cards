import React from "react";
import style from './ChangeProfileModal.module.css'
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

type propsType = {
    name:string
    avatar: string
    email: string
    myProfile: boolean
    isOpen:boolean
    changeIsOpen: (modal: boolean)=>void
}

export const ChangeProfileModal = ({name, avatar, email,  myProfile,isOpen, changeIsOpen}:propsType) => {

    const closeModalHandler=()=>{
       // changeIsOpen(false)
    }


    return (
        <div>
            {isOpen &&
                (<div className={style.wrapper}>
                    <div className={style.body}>
                        <div className={style.containerModal}>
                            <h1 className={style.titleModal}>Profile</h1>
                            <div className={style.content}>
                                <img className={style.image} src={avatar} alt="avatar"/>
                                <div className={style.info}>Name: {name}</div>
                                <div className={style.info}>Email: {email}</div>
                            </div>
                            <div className={style.buttonContainer}>
                                <Button onClick={()=>console.log('ff')} color={"secondary"}>
                                    save
                                </Button>
                                <Button onClick={closeModalHandler} color={"secondary"}>
                                    cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}