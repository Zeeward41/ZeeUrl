import './LinkShortener.css'

export default function LinkShortener() {
    return (
        <div className="reducer-container">
            <div className='reducer-domain'>zeeurl.com/</div>
            <form className='reducer-form'>
                    <input type='url' id='reducer-input' placeholder='Enter the URL to shorten' required />
                    <button className='reducer-button'>Minify</button>
            </form>
        </div>
    )
}