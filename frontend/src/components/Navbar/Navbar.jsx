import './Navbar.css'
import ProfileButton from './ProfileButton/ProfileButton.jsx'
import {Link} from 'react-router-dom'
import React from 'react'
import { useAuthContext } from '../../context/AuthContext.jsx'

function Navbar() {
    const {authState} = useAuthContext()
    console.log(`isAuthenticated : ${authState.isAuthenticated}`)
    return (
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
    )
   
}

export default Navbar
