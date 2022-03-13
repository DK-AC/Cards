import s from './Modal.module.css'
import {Button} from "@mui/material";

type DeletePackType = {
    showDelete: (modal: boolean) => void
    deleteFunction: () => void
}

export const DeleteModal = ({showDelete,deleteFunction}:DeletePackType) => {
    return (
        <div className={s.containerModal}>
            <h1 className={s.titleModal}>Delete Pack</h1>
            <div className={s.content}>Are you sure?</div>
            <div className={s.buttonContainer}>
                <Button onClick={deleteFunction} className={s.buttonLRMargin} color={"secondary"}>
                delete
            </Button>
                <Button onClick={() => showDelete(false)} className={s.buttonLRMargin} color={"secondary"}>
                    cancel
                </Button></div>
        </div>
    )
}