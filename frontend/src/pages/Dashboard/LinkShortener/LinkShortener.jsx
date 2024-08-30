import './LinkShortener.css'
import { useState } from 'react'
import { minifyUrlValidation } from '../../../utils/InputValidation.jsx'
import {ENDPOINTS} from '../../../../config.js'
import Notification from '../../../components/Notification/Notification.jsx'
import { useNavigate } from 'react-router-dom'

export default function LinkShortener() {

    const endpointGenerate = ENDPOINTS.GENERATE
    const [longUrl, setLongUrl] = useState('')
    const [customAlias, setCustomAlias] = useState('')
    const {url, alias} = {...minifyUrlValidation[0]}
    const navigate = useNavigate()

    // idle  | loading | success | error
    const [formState, setFormState] = useState({
        status: 'idle',
        message: ''
    })

    function onChangeUrl(e) {
        setLongUrl(e.target.value)
    }
    
    function onChangeAlias(e) {
        setCustomAlias(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        setFormState({
            status: 'loading',
            message: ''
        })
        
        let linkData = {
            "url": longUrl,
            "alias": customAlias
        }

        if(customAlias === '') {
            linkData = {
                "url": longUrl,
            }
        }

        const response = await fetch(endpointGenerate, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(linkData)
        })

        const json = await response.json()

        if(json.success) {
            setFormState({
                status: 'success',
                message: 'URL minified successfully!'
            })
            setTimeout(() => {
                navigate(0)
            }, 1000)
        } else if (json.error === 'Duplicate field value entered') {
            setFormState({
                status: 'error',
                message: 'A Minify URL with this alias already exists.'
            })
        } else {
            setFormState({
                status: 'error',
                message: 'Something went wrong!'
            })
        }
        
    }
    return (
        <div className="reducer-container">
            <form onSubmit={handleSubmit} className='reducer-form'>
                <div className='reducer-random'>
                    <span><i className="fa-solid fa-link"></i> {url.label}</span>
                    <input 
                        key={url.name}
                        onChange={onChangeUrl} 
                        type={url.type} 
                        id='reducer-input' 
                        placeholder={url.placeholder} 
                        value={longUrl}
                        required={url.required} 
                    />
                </div>

                <div className='reducer-custom'>
                    <label 
                        htmlFor='custom-input'>
                        <i className="fa-solid fa-wand-magic"></i> {alias.label}
                    </label>
                    <input 
                        key={alias.name}
                        type={alias.type} 
                        id='custom-input' 
                        className="custom-input" 
                        placeholder={alias.placeholder}
                        value={customAlias}
                        onChange={onChangeAlias}
                        required={alias.required}
                        pattern={alias.pattern}
                    />
                    <button 
                        className='reducer-button'
                        type='submit'
                        disabled={formState.status === 'loading'}>
                            {formState.status === 'loading' ? 'Submitting...' : 'Minify'}
                    </button>
                </div>
            </form>
                {(formState.status === 'success' || formState.status === 'error') && (
                <Notification
                    className='minify-notif'
                    type={formState.status}
                    message={formState.message}
                />
            )}

            {(formState.status === 'success' || formState.status === 'error') ?
            <div className='separator notif'></div> : <div className='separator'></div>}
        </div>
    )
}


