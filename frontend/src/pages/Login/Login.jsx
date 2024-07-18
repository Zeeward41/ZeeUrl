import React from 'react'
import FormInput from '../../components/FormInput/FormInput.jsx'
import InputValidation from '../../utils/InputValidation.jsx'

export default function Login() {
    const fields = ['email', 'password']

    const [values, setValues] = React.useState({
        email: "",
        password: "",
    })

    function handleSubmit(e) {
        e.preventDefault()
    }

    function onChange(e) {
        const newDict = {...values}
        newDict[e.target.id] = e.target.value
        setValues(newDict)

    }
    return (
        <div className='form-container'>
            <form
            onSubmit={handleSubmit}>
                <h1>Login</h1>
                {fields.map((fieldName) => {
                    const field = InputValidation[0][fieldName]
                    return (
                    <FormInput 
                    key={field.name}
                    label={field.name}
                    onChange={onChange}
                    value={values.fieldName}
                    type={field.name === 'password' ? field.type : ''}
                    />
                )})}
                <button className='button-submit'>Submit</button>
            </form>
        </div>
    )
}