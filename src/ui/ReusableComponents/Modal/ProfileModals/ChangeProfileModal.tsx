import React, {ChangeEventHandler, MouseEventHandler, useRef, useState} from "react";
import style from './ChangeProfileModal.module.css'
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import {fileApi} from "../../../../dal/fileApi";
import {useDispatch} from "react-redux";
import {changeIMG, changeProfile} from "../../../../bll/reducers/profileReducer";

type propsType = {
    name: string
    avatar: string
    email: string
    myProfile: boolean
    isOpen: boolean
    closeModal: () => void
}

export const ChangeProfileModal = ({name, avatar, email,  isOpen,myProfile,...props}: propsType) => {

    const dispatch = useDispatch()

    const inRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File|null>(null);
    const [fileURL, setFileURL] = useState<string>('');

    //закрыть модалку
    const backGroundClick:MouseEventHandler<HTMLDivElement|HTMLButtonElement> = (e) => {
        props.closeModal()
        setFileURL('')
    }

    //для EditableSpan
    //name
    const [editName, setEditName] = useState(name)
    const onChangeEditName=(newName: string)=>{
        setEditName(newName)
    }


    //подгрузка аватарки
  const  uploadHandler:ChangeEventHandler<HTMLInputElement>=(e)=>{
      const newFile = e.target.files && e.target.files[0];
      if (newFile){
          setFile(newFile) //сохраняем файл
          setFileURL(window.URL.createObjectURL(newFile));//сохраняем внутреннюю ссылку, чтоб отобразить в img
      }
    }
const uploadButtonHandler:MouseEventHandler<HTMLButtonElement> =(e)=>{
    inRef && inRef.current && inRef.current.click()
}

const saveNewData=()=>{
    file && fileApi.postFile(file)
    dispatch(changeProfile(editName))
    dispatch(changeIMG(fileURL))
    props.closeModal()
}

    return (<div>
            {isOpen && <>
                <div className={style.wrapper}  onClick={backGroundClick}> </div>
                <div className={style.bodyModal}>
                    <div className={style.containerModal}>
                        <h1 className={style.titleModal}>Personal information</h1>
                        <div className={style.content}>
                            <img className={style.image} src={fileURL? fileURL: avatar} alt="avatar"/>
                            <input type={'file'}  className={style.hiddenInput}  ref={inRef} onChange={uploadHandler}/>
                               <button className={style.circle} onClick={uploadButtonHandler}>
                                   <AddAPhotoOutlinedIcon fontSize={'medium'} sx={{color: 'white'}}/></button>
                            <EditableSpan value={editName} onChange={onChangeEditName } placeholder={'Name'} myProfile={myProfile} />
                            <EditableSpan value={email}  placeholder={'Email'} myProfile={myProfile} />
                        </div>
                        <div className={style.buttonContainer}>
                            <Button onClick={saveNewData} color={"secondary"}>
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
