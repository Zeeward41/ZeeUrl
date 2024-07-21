import './ProfileButton.css'
import React from 'react'
import OptionProfileButton from '../OptionProfileButton/OptionProfileButton'
import {useOnClickOutside} from '../../../hooks/useOnClickOutside.jsx'
import { useAuthContext } from '../../../context/AuthContext.jsx'

const variousOption = [
    {icon: "fa-solid fa-user", text: "Profil"},
    {icon: "fa-solid fa-right-from-bracket", text: "Logout"},
    ]

function ProfileButton() {
    const [showProfilMenu, setShowProfilMenu] = React.useState(false)
    const ref = React.useRef()
    const {authState} = useAuthContext()

    useOnClickOutside(ref, () => {
        setShowProfilMenu(false)
    })

    return(
        
        <div ref={ref} className={`profile-button ${showProfilMenu ? 'active' : 'hidden'}`} 
        onClick={() => {
            setShowProfilMenu(!showProfilMenu)
        }}
        >
            <i className="fa-solid fa-user"></i>
            <span className="user">{authState.userInfo.name}</span>
            <div className={`profile-menu ${showProfilMenu ? 'active' : 'hidden'}`}>
                {variousOption.map(({icon, text}) => {
                    return (
                    <OptionProfileButton key={text} icon={icon} text={text} />
                )})}
            </div>
        </div>
    )
}

export default ProfileButton