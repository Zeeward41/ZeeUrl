import './Navbar.css'
import ProfileButton from './ProfileButton/ProfileButton.jsx'
import {Link} from 'react-router-dom'

const isAuth = false
function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">ZeeURL</Link>
        {isAuth === true ? <ProfileButton />:
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

