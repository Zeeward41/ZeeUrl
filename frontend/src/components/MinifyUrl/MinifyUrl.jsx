import './MinifyUrl.css'
import OptionConfigLink from './OptionConfigLink/OptionConfigLink.jsx'
import { useState, useRef } from 'react'
import {useOnClickOutside} from '../../hooks/useOnClickOutside.jsx'

export default function MinifyUrl() {
    const options = [
        {'text': 'Copy Link','icon': 'fa-solid fa-copy'},
        {'text': 'Edit Link', 'icon': 'fa-solid fa-pen-to-square'},
        {'text': 'Stats', 'icon': 'fa-solid fa-chart-simple'},
        {'text': 'Reset Stats', 'icon': 'fa-solid fa-rotate-left'},
        {'text': 'Delete Link', 'icon': 'fa-solid fa-trash'}
    ] 

    const [showPanel, setShowPanel] = useState(false)

    function handleClick() {
        setShowPanel(true)
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
                    <a href='https://www.wuxiaworld.com/' target="_blank" className='minify-url'>https://zeeurl.com/monlink</a>
                    <i className="fa-solid fa-copy"></i>
                </div>
            <a href='https://www.wuxiaworld.com/'target="_blank" className='original-url'>https://www.wuxiaworld.com</a>
            </div>
            <div className='right-box'>
                <div className='box-stats'>
                    <span className='num-stats'>12</span>
                    <i className="fa-solid fa-chart-simple"></i>
                </div>
                <span className='creation-date'>06/29/24</span>
                <button onClick={handleClick} className='url-config'><i className="fa-solid fa-gear"></i><i className="fa-solid fa-caret-down"></i></button>
                {showPanel ? 
                <div className='option-config-panel' ref={refPanel}>
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