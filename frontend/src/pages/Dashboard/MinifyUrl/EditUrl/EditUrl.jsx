import './EditUrl.css'
import { useState } from 'react'
import { ENDPOINTS } from '../../../../../config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { minifyUrlValidation } from '../../../../utils/InputValidation'

export default function EditUrl({token, linkOriginal, onClose}) {

    const [valueShortUrl, setValueShortUrl] = useState(token)
    const [valueDestinationUrl, setValueDestinationUrl] = useState(linkOriginal)
    const endpointUpdateUrl = ENDPOINTS.UPDATEURLS
    const navigate = useNavigate()
    const urlValidation = minifyUrlValidation[0].url
    const aliasValidation = minifyUrlValidation[0].alias


    async function handleSave(e) {
        e.preventDefault()
        try {
            const response = await fetch(`${endpointUpdateUrl}/${token}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: valueShortUrl,
                    link_original: valueDestinationUrl
                })
            })

            const json = await response.json()

            if (json.success) {
                navigate(0)
            } else if (!json.ok) {
                switch (response.status) {
                    case 404:
                        toast.error('URL not Found')
                        break
                    case 401:
                        toast.error('Not Authorized to edit this URL')
                        break
                    default:
                        toast.error('Someting went wrong!')
                }
            }

        } catch (error) {
            toast.error('something went wrong... try again!')
        }
    }

    function changeShortUrl(e) {
        const newValue = e.target.value
        setValueShortUrl(newValue)
    }
    
    function changeDestinationUrl(e) {
        const newValue = e.target.value
        setValueDestinationUrl(newValue)
}

    return (
        <div className='editUrl-wrapper'>
            <header className='editUrl-header' >
                <span className='editUrl-span'>{`Update ${token}`}</span>
                <button className='fa-solid fa-xmark editUrl-close' onClick={onClose}></button>
            </header>
            <form className='editUrl-form' onSubmit={handleSave}>
                <div className='editUrl-box shortUrl'>
                    <label className='editUrl-label-shortUrl' htmlFor='shortUrl' >Short URL:</label>
                    <input 
                    className='shortUrl' 
                    type='text' 
                    value={valueShortUrl} 
                    onChange={changeShortUrl}
                    required
                    pattern={aliasValidation.pattern}
                    onInvalid={() => toast.error(`${aliasValidation.errorMessage}`)}
                    />
                </div>
                <div className='editUrl-box destinationUrl'>
                    <label className='editUrl-label-destinationUrl' htmlFor='destinationUrl'>Destination URL:</label>
                    <input 
                    className='destinationUrl' 
                    type='url' 
                    value={valueDestinationUrl} 
                    onChange={changeDestinationUrl}
                    required 
                    onInvalid={() => toast.error(`${urlValidation.errorMessage}`)}
                    />
                </div>
                <div className='editUrl-box-buttons'>
                    <button className='editUrl-button cancel' type='button' onClick={onClose}>Cancel</button>
                    <button className='editUrl-button save' type='submit'  >Save</button>
                </div>
            </form>
        </div>
    )
}
