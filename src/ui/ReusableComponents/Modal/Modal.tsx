import s from './Modal.module.css'
import {MouseEventHandler, ReactElement} from 'react';
type ReturnComponentType = Nullable<ReactElement>;
type Nullable<T> = T | null;
type ModalType = {
    isOpen: boolean
    closeModal: ()=>void
}
export const Modal: React.FC<ModalType> = ({ children, isOpen ,...props}): ReturnComponentType => {

    const backGroundClick:MouseEventHandler<HTMLDivElement> = (e) => {
        props.closeModal&& props.closeModal()
    }

    return (
        <div>
            {isOpen &&<>
                <div className={s.wrapper} onClick={backGroundClick}>  </div>
                <div className={s.body}>
                   {children}
                </div>
            </>

            }
        </div>
       /* <div>
            {isOpen &&
            (<div className={s.wrapper}>
                <div className={s.body}>
                    <div>{children}</div>
                </div>
            </div>)
            }
        </div>*/
    )
}