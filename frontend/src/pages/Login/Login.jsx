import React from 'react'
import FormInput from '../../components/FormInput/FormInput.jsx'
import InputValidation from '../../utils/InputValidation.jsx'
import Notification from '../../components/Notification/Notification.jsx'
import { ENDPOINTS } from '../../../config.js'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const fields = ['email', 'password']
    const endpointLogin = ENDPOINTS.LOGIN
    const navigate = useNavigate()

    const [values, setValues] = React.useState({
        email: "",
        password: "",
    })

    // idle  | loading  | success  | error
    const [formState, setFormState] = React.useState({
        status: 'idle',
        message: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()

        setFormState({
            status: 'loading',
            message: ''
        })

        const response = await fetch(endpointLogin, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password
            }),
        })

        const json = await response.json()

        if (json.success) {
            setFormState({
                status: 'success',
                message: 'You have successfully logged in.'
            })

            setTimeout(() => {
                navigate('/')
            },1000)
        } else if (json.error === 'User not found. Please check your email and try again.' ||
             json.error === 'Invalid credentials. Please check your password and try again.' ||
             json.error === "Password must be at least 8 characters long, Password must contain at least one letter, one number, and one special character" ||
             json.error === 'Please enter a valid email' ) {
            setFormState({
                status: 'error',
                message: 'Incorrect email or password. Please try again.'
            })
        } else {
            setFormState({
                status: 'error',
                message: 'Something went wrong!'
            })
        }
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

                {(formState.status === 'success' || formState.status === 'error') && (
                    <Notification
                        type={formState.status}
                        message={formState.message}
                    />
                )}
                <button 
                className='button-submit'
                disabled={formState.status === 'loading'}>
                {formState.status === 'loading' ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}