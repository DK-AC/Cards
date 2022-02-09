import {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from "react";
import s from './SuperInputText.module.css'
import {TypeForInputType} from "../../shared";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    value?: string
    inputType?: string | TypeForInputType
}

export const SuperInputText = ({
                                   type, placeholder, disabled, onChange, onChangeText,
                                   onKeyPress, onEnter,
                                   error, className,
                                   spanClassName, value, inputType, ...props
                               }: SuperInputTextPropsType) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {

        onChange && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter && e.key === 'Enter' && onEnter()
    }
    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${s.input} ${error ? s.errorInput : s.superInput}`

    return (
        <div>

            <input
                value={value}
                type={inputType}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                placeholder={placeholder}
                disabled={disabled}
            />
            {error && <span className={finalSpanClassName}>{error}</span>}
        </div>
    )
}