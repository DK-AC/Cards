import React, {ChangeEvent} from 'react';
import style from "./Raiting.module.css";
;

type RatingType ={

}

const Raiting = () => {
    const onRadioChange = (value:string | number) => {
        console.log(value)
    }
    const values =[
        {value: 1, description: ` Didn't know the answer`}, //не знал ответ
        {value: 2, description:' Forgot'}, //забыл ответ
        {value: 3, description:' Answered with errors'}, //ответил с ошибками
        {value: 4, description:` Didn't fully answer`},  //дал неполный ответ
        {value: 5, description:' Gave the correct answer'}  //дал верный  ответ
        ]

    return (
        <div className={style.container}>
            <span className={style.title}>Rate yourself:</span>
            <ul>
                {values.map(v => {
                  return  <RaitingItem value={v.value} onRadioChange={onRadioChange} key={v.value} description={v.description}/>
                } ) }
            </ul>
        </div>
    );
};

type RaitingItemType={
    onRadioChange:(value:string | number )=>void
    value: string | number
    description: string
}


const  RaitingItem =({onRadioChange,value, description}:RaitingItemType)=>{
    const onRadioChangeHandler=(e: ChangeEvent<HTMLInputElement>)=>{
        onRadioChange(e.currentTarget.value)
    }
    return <li className={style.rateItem}>
        <label>
            <input value={value} onChange={onRadioChangeHandler} name={'rate'} type="radio"/>
            {description}
        </label>
    </li>
}

export default Raiting;