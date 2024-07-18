import React from 'react'
import FormInput from '../../components/FormInput/FormInput.jsx'
import InputValidation from '../../utils/InputValidation.jsx'
import Notification from '../../components/Notification/Notification.jsx'
import  {ENDPOINTS} from '../../../config.js'
import { useNavigate } from 'react-router-dom'

import './signUP.css'

export default function Signup() {
    const fields = ['username', 'email', 'birthday', 'password','confirmPassword']
    const endpointRegister= ENDPOINTS.REGISTER
    const navigate = useNavigate()

    const [values, setValues] = React.useState({
        username: "",
        email: "",
        birthday: "",
        password: "",
        confirmPassword: "",
    })
    
    // idle | loading | success | error
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

        const response = await fetch(endpointRegister, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: values.username,
                email: values.email,
                birthday: values.birthday,
                password: values.password
            }),
        })

        const json = await response.json()
        console.log(json) 

        if (json.success) {
            setFormState({
                status: 'success',
                message: 'Account created successfully!'
            })

            setTimeout(() => {
                navigate('/')
            },1000)
            
        } else if(json.error === 'Duplicate field value entered'){
            setFormState({
                status: 'error',
                message: 'An account with this email already exists.'
            })
        }else {
            setFormState({
                status: 'error',
                message: 'Something went wrong!'
            })
        }
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
                {(formState.status === 'success' || formState.status === 'error') && (
                <Notification 
                    type={formState.status} 
                    message={formState.message}
                />
            )}
                <button 
                className='button-submit'
                disabled={formState.status === 'loading'}>
                {formState.status === 'loading' ? 'Submitting...' : 'Submit'}</button>
            </form>
        </div>
    )
}