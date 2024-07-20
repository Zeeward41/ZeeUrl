import './Navbar.css'
import ProfileButton from './ProfileButton/ProfileButton.jsx'
import {Link} from 'react-router-dom'
import React from 'react'

function Navbar({isAuthenticated, userInfo}) {
    console.log(`isAuthenticated: ${isAuthenticated}`)
    return (
        <nav className="nav">
            <Link to="/" className="site-title">ZeeURL</Link>
        {isAuthenticated ? <ProfileButton userInfo={userInfo}/>:
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
