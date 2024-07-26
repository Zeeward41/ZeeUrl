import './Navbar.css'
import ProfileButton from './ProfileButton/ProfileButton.jsx'
import {Link} from 'react-router-dom'
import React from 'react'
import { useAuthContext } from '../../context/AuthContext.jsx'
import ModalMessage from '../ModalMessage/ModalMessage.jsx'
import { useModalMessageContext } from '../../context/ModalMessageContext.jsx'

function Navbar() {
    const {authState} = useAuthContext()
    const {showLogoutMessage, typeModal, messageModal} = useModalMessageContext()
    return (
        <div className="nav-container">
            <nav className="nav">
                <Link to="/" className="site-title">ZeeURL</Link>
            {authState.isAuthenticated ? <ProfileButton />:
                <ul>
                    <li>
                        <Link to="/signup" >Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
                }
            </nav>
            {showLogoutMessage ? <ModalMessage type={typeModal} message={messageModal}/> : ''}
        </div>
    )
   
}

export default Navbar
