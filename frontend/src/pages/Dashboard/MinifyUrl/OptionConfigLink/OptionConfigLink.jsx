import './OptionConfigLink.css'

export default function OptionConfigLink({text, icon, action, setShowPanel}) {
    function handleClick(e) {
        e.stopPropagation()
        if (action && typeof action === 'function'){
            action()
            setTimeout(() => {
                setShowPanel(false)
            }, 100)
        }
    }
    return (
    <div className='option-config-container' onClick={handleClick}>
        <i className={`${icon} option-config-icon`}></i>
        <span className='option-config-text'>{text}</span>
    </div>
    )
}