import './OptionConfigLink.css'

export default function OptionConfigLink({text, icon, onClick}) {
    return (
    <div className='option-config-container' onClick={onClick}>
        <i className={`${icon} option-config-icon`}></i>
        <span className='option-config-text'>{text}</span>
    </div>
    )
}