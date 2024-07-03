import './OptionProfileButton.css'
export default function OptionProfileButton({icon, text}) {
    return (
        <div className="option-profile-button">
            <i className={icon}></i>
            <a href="/">{text}</a>
        </div>

    )
}