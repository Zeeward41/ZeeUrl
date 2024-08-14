import './MinifyUrl.css'
import OptionConfigLink from './OptionConfigLink/OptionConfigLink.jsx'
import { useState, useRef } from 'react'
import {useOnClickOutside} from '../../../hooks/useOnClickOutside.jsx'
import { format } from 'date-fns'
import ConfirmationModal from '../../../components/ConfirmationModal/ConfirmationModal.jsx'
import { ENDPOINTS } from '../../../../config.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getOptions } from './optionsConfig.js'

export default function MinifyUrl({linkOriginal, token, numVisit, createdAt}) {
    const [showPanel, setShowPanel] = useState(false)
    const shortUrl = `https://www.zeeurl.com/${token}`
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [task, setTask] = useState('')
    const endpointDeleteUrl = ENDPOINTS.DELETEURLS
    const endpointUpdateUrl = ENDPOINTS.UPDATEURLS
    const navigate = useNavigate()

    

    

    function handleClick() {
        setShowPanel(!showPanel)
    }
    
    const refPanel = useRef()
    const refButton = useRef()

    useOnClickOutside([refPanel, refButton], () => {
        setShowPanel(false)
    })

    function copyUrlToClipboard() {
        navigator.clipboard.writeText(shortUrl)
        setTimeout(() => {
            setShowPanel(false)
        },100)
    }

    async function deleteUrl() {
        setTask('Delete Link')
        setShowPanel(false)
        setShowConfirmationModal(true)

    }
    function resetUrl() {
        setTask('Reset Stats')
        setShowPanel(false)
        setShowConfirmationModal(true)

    }
    
    const options = getOptions(copyUrlToClipboard, resetUrl, deleteUrl)
    
    async function handleConfirmAction() {
        let response
        let json
        try {
            switch (task) {
                case 'Delete Link': 
                    response = await fetch(`${endpointDeleteUrl}/${token}`, {
                        method: "DELETE",
                        credentials: "include"
                    })
                    break
                case 'Reset Stats': 
                    response = await fetch(`${endpointUpdateUrl}/${token}`, {
                        method: "PUT",
                        credentials: "include",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            num_visit: 0,
                            num_unique_visite: 0
                        })
                    })
                    break
            }

            json = await response.json()

            handleResponse(response, json, task)
            setShowConfirmationModal(false)
        } catch (error) {
            toast.error('Something went wrong... try again !')
        }
    }

    function handleResponse(response, json, task) {
        if (!response.ok) {
            switch (response.status) {
                case 404:
                    toast.error(task === 'Delete Link' ? 'URL not found' : 'URN not found')
                    break
                case 401:
                    toast.error(task === 'Delete Link' ? 'Not Authorized to delete this URL' : 'Not Authorized to update this URL')
                    break
                default:
                    toast.error('Something went wrong!')
            }
        } else if (json.success) {
            navigate(0)
        }
    }

    function handleCancel() {
        setShowConfirmationModal(false)
    }
    

    return (
        <div className='url-container'>
            <div className='left-box'>
                <div className='url-qr'>
                    <i className="fa-solid fa-qrcode"></i>
                    <a href={shortUrl} target="_blank" className='minify-url'>{token.length > 12 ? `zeeurl.com/${token.slice(0,12)}...`: `zeeurl.com/${token}`}</a>
                    <i className="fa-solid fa-copy" onClick={copyUrlToClipboard}></i>
                </div>
            <a href={linkOriginal} target="_blank" className='original-url'>{linkOriginal.length > 30 ? `${linkOriginal.slice(0,30)}...` : linkOriginal}</a>
            </div>
            <div className='right-box'>
                <div className='box-stats'>
                    <span className='num-stats'>{numVisit}</span>
                    <i className="fa-solid fa-chart-simple"></i>
                </div>
                <span className='creation-date'>{format(new Date(createdAt), 'dd-MM-yyyy')}</span>
                <button onClick={handleClick} ref={refButton} className='url-config'><i className="fa-solid fa-gear"></i><i className="fa-solid fa-caret-down"></i></button>
                {showPanel ? 
                <div className='option-config-panel' ref={refPanel}>
                {options.map(({text, icon, onClick}) => {
                    return (
                        <OptionConfigLink key={text} text={text} icon={icon} onClick={onClick} />
                    )
                })}
                </div> : ''}
            </div>
            {showConfirmationModal ? <ConfirmationModal onCancel={handleCancel} onConfirm={handleConfirmAction} /> : ''}
        </div>
    )
}