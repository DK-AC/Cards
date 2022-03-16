import s from '../Modal.module.css'
import {Button, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";

type UpdatePackType = {
    showUpdate: (modal: boolean) => void
    updatePack: (text: string) => void
    packName?:string
}

export const UpdatePack = ({showUpdate, updatePack, packName}: UpdatePackType) => {
    let name = packName? packName: ''
    const [text, setText] = useState<string>(name)
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const updatePackName = (): void => {
        updatePack(text);
    };
    return (
        <div className={s.containerModal}>
            <h1 className={s.titleModal}>Update Pack</h1>
            <div className={s.content}>
                <TextField id="New-pack-name" label="New pack name" variant="standard"  onChange={onChangeHandler} value={text}/>
            </div>
            <div className={s.buttonContainer}>
                <Button onClick={updatePackName} color={"secondary"}>
                update
            </Button>
                <Button onClick={() => showUpdate(false)} color={"secondary"}>
                    cancel
                </Button></div>
        </div>
    )
}