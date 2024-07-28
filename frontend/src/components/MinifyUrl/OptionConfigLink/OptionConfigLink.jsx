import './OptionConfigLink.css'

export default function OptionConfigLink({text, icon}) {
    return (
    <div className='option-config-container'>
        <i className={`${icon} option-config-icon`}></i>
        <span className='option-config-text'>{text}</span>
    </div>
    )
}