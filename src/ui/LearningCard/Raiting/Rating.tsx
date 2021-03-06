import React, {ChangeEvent} from 'react';
import style from "./Raiting.module.css";
import {useDispatch} from "react-redux";
import {changeGradeAC} from "../../../bll/reducers/cardReducer";


type RatingType = {
    id: string | undefined
}

const Rating = ({id}: RatingType) => {
    const dispatch = useDispatch()
    //с каждым изменение отправлялся запрос на сервер
    //const onRadioChange = (value: number) => {
    //         dispatch(changeGradeTC({grade: value, card_id: id}))
    //     }
    //теперь отправляется запрос только когда нажимаю на следующую карточку
    const onRadioChange = (value: number) => {
        dispatch(changeGradeAC({grade: value, card_id: id}))
    }
    const values = [
        {value: 1, description: ` Didn't know the answer`}, //не знал ответ
        {value: 2, description: ' Forgot'}, //забыл ответ
        {value: 3, description: ' Answered with errors'}, //ответил с ошибками
        {value: 4, description: ` Didn't fully answer`},  //дал неполный ответ
        {value: 5, description: ' Gave the correct answer'}  //дал верный ответ
    ]

    return (
        <div>
            <h3 className={style.title}>Rate yourself:</h3>
            <ul>
                {values.map(v => {
                    return <RatingItem value={v.value} onRadioChange={onRadioChange} key={v.value}
                                       description={v.description}/>
                })}
            </ul>
        </div>
    );
};

type RatingItemType = {
    onRadioChange: (value: number) => void
    value: number
    description: string
}


const RatingItem = ({onRadioChange, value, description}: RatingItemType) => {
    const onRadioChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onRadioChange(+e.currentTarget.value)
    }
    return <li className={style.rateItem}>
        <label>
            <input value={value} onChange={onRadioChangeHandler} name={'rate'} type="radio"/>
            {description}
        </label>
    </li>
}

export default Rating;