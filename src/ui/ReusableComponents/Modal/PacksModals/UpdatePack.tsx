import s from '../Modal.module.css'
import {Button, Input} from "@mui/material";
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
            <div>
                <Input type={'test'}
                       value={text}
                       onChange={onChangeHandler}
                       placeholder="new pack name"/>
            </div>
            <Button onClick={updatePackName} className={s.buttonLRMargin}>
                update
            </Button>
            <Button onClick={() => showUpdate(false)} className={s.buttonLRMargin}>
                cancel
            </Button>

        </div>
    )
}