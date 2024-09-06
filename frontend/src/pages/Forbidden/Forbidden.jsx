import './Forbidden.css'

export default function Forbidden() {
    return (
        <div className='forbidden'>
            <span className='forbidden-statuscode'>403</span>
            <span className='forbidden-text'>Forbidden</span>
        </div>
    )
}