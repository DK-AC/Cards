import React, {MouseEventHandler, useState} from "react";
import style from './ChangeProfileModal.module.css'
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

type propsType = {
    name: string
    avatar: string
    email: string
    myProfile: boolean
    isOpen: boolean
    closeModal: () => void
}

export const ChangeProfileModal = ({name, avatar, email,  isOpen,myProfile,...props}: propsType) => {

    const backGroundClick:MouseEventHandler<HTMLDivElement|HTMLButtonElement> = (e) => {
        props.closeModal()
    }

    //для EditableSpan
    //name
    const [editName, setEditName] = useState(name)
    const onChangeEditName=(name: string)=>{
        setEditName(name)
    }



    return (<div>
            {isOpen && <>
                <div className={style.wrapper}  onClick={backGroundClick}> </div>
                <div className={style.bodyModal}>
                    <div className={style.containerModal}>
                        <h1 className={style.titleModal}>Personal information</h1>
                        <div className={style.content}>
                            <img className={style.image} src={avatar} alt="avatar"/>
                               <button className={style.circle}> <AddAPhotoOutlinedIcon fontSize={'medium'} sx={{color: 'white'}}/></button>
                            <EditableSpan value={editName} onChange={onChangeEditName } placeholder={'Name'} myProfile={myProfile} />
                            <EditableSpan value={email}  placeholder={'Email'} myProfile={myProfile} />
                        </div>
                        <div className={style.buttonContainer}>
                            <Button onClick={()=>console.log('ff')} color={"secondary"}>
                                save
                            </Button>
                            <Button onClick={backGroundClick} color={"secondary"}>
                                cancel
                            </Button>
                        </div>
                    </div>
                </div>
                </>
            }
                </div>)
}
