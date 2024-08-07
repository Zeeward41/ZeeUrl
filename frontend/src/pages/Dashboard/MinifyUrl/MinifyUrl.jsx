import './MinifyUrl.css'
import OptionConfigLink from './OptionConfigLink/OptionConfigLink.jsx'
import { useState, useRef } from 'react'
import {useOnClickOutside} from '../../../hooks/useOnClickOutside.jsx'
import { format } from 'date-fns'

export default function MinifyUrl({linkOriginal, token, numVisit, createdAt}) {
    const options = [
        {'text': 'Copy Link','icon': 'fa-solid fa-copy'},
        {'text': 'Edit Link', 'icon': 'fa-solid fa-pen-to-square'},
        {'text': 'Stats', 'icon': 'fa-solid fa-chart-simple'},
        {'text': 'Reset Stats', 'icon': 'fa-solid fa-rotate-left'},
        {'text': 'Delete Link', 'icon': 'fa-solid fa-trash'}
    ] 

    const [showPanel, setShowPanel] = useState(false)

    function handleClick() {
        setShowPanel(!showPanel)
    }
    
    const refPanel = useRef()

    useOnClickOutside(refPanel, () => {
        setShowPanel(false)
    })

    return (
        <div className='url-container'>
            <div className='left-box'>
                <div className='url-qr'>
                    <i className="fa-solid fa-qrcode"></i>
                    <a href={`https://zeeurl.com/${token}`} target="_blank" className='minify-url'>{token > 12 ? `zeeurl.com/${token.slice(0,12)}...`: `zeeurl.com/${token}`}</a>
                    <i className="fa-solid fa-copy"></i>
                </div>
            <a href={linkOriginal} target="_blank" className='original-url'>{linkOriginal.length > 30 ? `${linkOriginal.slice(0,30)}...` : linkOriginal}</a>
            </div>
            <div className='right-box'>
                <div className='box-stats'>
                    <span className='num-stats'>{numVisit}</span>
                    <i className="fa-solid fa-chart-simple"></i>
                </div>
                <span className='creation-date'>{format(new Date(createdAt), 'dd-MM-yyyy')}</span>
                <button onClick={handleClick} ref={refPanel} className='url-config'><i className="fa-solid fa-gear"></i><i className="fa-solid fa-caret-down"></i></button>
                {showPanel ? 
                <div className='option-config-panel'>
                {options.map(({text, icon}) => {
                    return (
                        <OptionConfigLink key={text} text={text} icon={icon} />
                    )
                })}
                </div> : ''}
            </div>
        </div>
    )
}