import React from 'react'
import FormInput from '../../components/FormInput/FormInput.jsx'
import InputValidation from '../../utils/InputValidation.jsx'

import './signUP.css'

export default function Signup() {
    const fields = ['username', 'email', 'birthday', 'password','confirmPassword']

    const [values, setValues] = React.useState({
        username: "",
        email: "",
        birthday: "",
        password: "",
        confirmPassword: "",
    })

    function handleSubmit(e) {
        e.preventDefault()
        console.log(values)
    }
    function onChange(e) {
        const newDict = {...values}
        newDict[e.target.name] = e.target.value

        setValues(newDict)
    }


    return (
        <div className='form-container' >
            <form
            id='form-signup'
            onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                {fields.map((fieldName) => {
                    const field = InputValidation[0][fieldName]
                    return (
                        <FormInput 
                        key={field.name}
                        label={field.name}
                        onChange={onChange} 
                        errorMessage={field.errorMessage} 
                        value={values[field.name]}
                        comparepassword={field.name === 'confirmPassword' ? values.password : null}
                        {...field} 
                        />
                    )
                })}
                <button className='button-submit'>Submit</button>
            </form>
        </div>
    )
}