import './ModalMessage.css'

export default function ModalMessage({type, message}) {

    return (
        <div className={`modalMessage-container ${type}`} >
            <span className='modalMessage-message'>{message}</span>
        </div>
    )
} 