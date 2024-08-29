import './OptionProfileButton.css'
import { useAuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useModalMessageContext } from '../../../context/ModalMessageContext'

export default function OptionProfileButton({icon, text, redirect}) {
    const {logout} = useAuthContext()
    const navigate = useNavigate()
    const {openModal, closeModal} = useModalMessageContext()

    async function handleClick() {

        // cas logout
        if(text === 'Logout') {
            const response = await logout()
            if (response.success) {
            openModal('success', response.message)
            } else {
            openModal('error', response.message)
            }
            closeModal(2000)
            navigate(redirect)
        }

        // cas profile
        if(text === 'Link') {
            navigate(redirect)
        }
        
    }

    
    return (
        <button className="option-profile-button" onClick={handleClick} >
            <i className={icon}></i>
            <span>{text}</span>

        </button>

    )
}