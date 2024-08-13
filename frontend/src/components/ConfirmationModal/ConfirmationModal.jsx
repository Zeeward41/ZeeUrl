import './ConfirmationModal.css'

export default function ConfirmationModal({onConfirm, onCancel}) {
    return (
        <>
            <div className='confirmation-background-blur'></div>
            <div className='confirmation-wrapper'> 
                <span className="confirmation-action">Delete Minify Link </span>
                <span className="confirmation-question">Are you sure you vant to delete ?</span>
                <div className="confirmation-button-box">
                    <button className='confirmation-button false' onClick={onCancel} >No, Cancel</button>
                    <button className='confirmation-button true' onClick={onConfirm}>Confirm</button>
                </div>

            </div>
        </>
    )
}