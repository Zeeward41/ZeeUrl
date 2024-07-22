import './OptionProfileButton.css'
import { useAuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function OptionProfileButton({icon, text, redirect}) {
    const {logout} = useAuthContext()
    const navigate = useNavigate()

    function handleClick() {
        if(text === 'Logout') {
            logout()
        }
        navigate(redirect) 
        }

    
    return (
        <div className="option-profile-button">
            <i className={icon}></i>
            <button onClick={handleClick} >{text}</button>
        </div>

    )
}