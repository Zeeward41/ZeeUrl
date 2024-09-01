import './Unauthorized.css'

export default function Unauthorized() {
    return (
        <div className='unauthorized'>
            <span className='unauthorized-statuscode'>401</span>
            <span className='unauthorized-text'>Unauthorized</span>
        </div>
    )
}