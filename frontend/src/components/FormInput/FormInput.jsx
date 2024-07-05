import React from 'react'
import './FormInput.css'

export default function FormInput({label, onChange, errorMessage,comparepassword, ...delegated})  {

    const [focused, setFocused] = React.useState(false)

    function handleFocus() {
        setFocused(true)
    }

    return (
        <div className='form-input'>
            <label htmlFor={label}>{label}</label>
            <input 
            id={label}
            onChange={onChange}
            onBlur={handleFocus}
            focus={focused.toString()}
            onFocus={() => {
                if (delegated.name === 'confirmPassword') {
                    setFocused(true)
                } }}
            {...delegated}
            pattern={delegated.name === 'confirmPassword' ? comparepassword : delegated.pattern}

             />
            <span className="error-message">{errorMessage}</span>
        </div>
    )
}