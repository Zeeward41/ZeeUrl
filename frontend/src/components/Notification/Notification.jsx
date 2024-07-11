import './Notification.css'

export default function Notification({type, message}) {
    const  messageIcons = {
        error : {
            title: 'Error!',
            icon: 'fa-solid fa-xmark'
        },
        success : {
            title: 'Success!',
            icon: 'fa-solid fa-check'
        }
    }

    return (
        <div className={`notif-container ${type}`} >
            <i className={messageIcons[type].icon} />
            <div>
                <span className='notif-title'>{messageIcons[type].title}</span>
                <span className='notif-message'>{message}</span>
            </div>
        </div>
    )
} 