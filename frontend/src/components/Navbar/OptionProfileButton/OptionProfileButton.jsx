import './OptionProfileButton.css'
import { useAuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function OptionProfileButton({icon, text, redirect}) {
    const {logout} = useAuthContext()
    const navigate = useNavigate()

    async function handleClick() {
        if(text === 'Logout') {
            const logoutState = await logout()
            if (logoutState.success) {
                navigate(redirect) 
            } else {
                console.log(logoutState.message)
            }
        }
        if(text === 'Profil') {
            navigate(redirect)
        }
        }

    
    return (
        <div className="option-profile-button">
            <i className={icon}></i>
            <button onClick={handleClick} >{text}</button>

        </div>

    )
}