import s from './Modal.module.css'
import {ReactElement} from 'react';
type ReturnComponentType = Nullable<ReactElement>;
type Nullable<T> = T | null;
type ModalType = {
    isOpen: boolean
}
export const Modal: React.FC<ModalType> = ({ children, isOpen ,...props}): ReturnComponentType => {
    return (
        <div>
            {isOpen &&
            (<div className={s.wrapper}>
                <div className={s.body}>
                    <div>{children}</div>
                </div>
            </div>)
            }
        </div>
    )
}