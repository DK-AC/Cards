import s from './Modal.module.css'
import {Button} from "@mui/material";

type DeletePackType = {
    showDelete: (modal: boolean) => void
    deletePack: () => void
}

export const DeletePack = ({showDelete,deletePack}:DeletePackType) => {
    return (
        <div className={s.containerModal}>
            <h1 className={s.titleModal}>Delete Pack</h1>
            <h2>Are you sure?</h2>
            <Button onClick={deletePack} className={s.buttonLRMargin}>
                delete
            </Button>
            <Button onClick={() => showDelete(false)} className={s.buttonLRMargin}>
                cancel
            </Button>
        </div>
    )
}