import './MinifyUrl.css'
import OptionConfigLink from './OptionConfigLink/OptionConfigLink.jsx'
import { useState, useRef } from 'react'
import {useOnClickOutside} from '../../../hooks/useOnClickOutside.jsx'
import { format } from 'date-fns'

export default function MinifyUrl({linkOriginal, token, numVisit, createdAt}) {
    const [showPanel, setShowPanel] = useState(false)
    const shortUrl = `https://www.zeeurl.com/${token}`

    const options = [
        {text: 'Copy Link',icon: 'fa-solid fa-copy', action: copyUrlToClipboard, setShowPanel: setShowPanel},
        {text: 'Edit Link', icon: 'fa-solid fa-pen-to-square'},
        {text: 'Stats', icon: 'fa-solid fa-chart-simple'},
        {text: 'Reset Stats', icon: 'fa-solid fa-rotate-left'},
        {text: 'Delete Link', icon: 'fa-solid fa-trash'}
    ] 

    

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
                {options.map(({text, icon, action, setShowPanel}) => {
                    return (
                        <OptionConfigLink key={text} text={text} icon={icon} action={action} setShowPanel={setShowPanel} />
                    )
                })}
                </div> : ''}
            </div>
        </div>
    )
}