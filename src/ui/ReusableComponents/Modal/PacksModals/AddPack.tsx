import s from '../Modal.module.css'
import {Button, Input} from "@mui/material";
import {ChangeEvent, useState} from "react";

type AddPackType = {
    showAdd: (modal: boolean) => void
    addPack: (text: string) => void
}

export const AddPack = ({showAdd, addPack}: AddPackType) => {
    const [text, setText] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const addNewPack = (): void => {
        addPack(text);
    };
    return (
        <div className={s.containerModal}>
            <h1 className={s.titleModal}>Create new Pack</h1>
            <div className={s.content}>
                <Input type={'test'}
                       value={text}
                       onChange={onChangeHandler}
                       placeholder="enter pack name"/>
            </div>

            <div className={s.buttonContainer}>
                <Button onClick={addNewPack} color={"secondary"}>
                add
            </Button>
                <Button onClick={() => showAdd(false)} color={"secondary"}>
                    cancel
                </Button></div>
        </div>
    )
}