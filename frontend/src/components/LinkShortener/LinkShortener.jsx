import './LinkShortener.css'

export default function LinkShortener() {
    return (
        // <div className="reducer-container">
        //         <form className='reducer-form'>
        //             <div className='reducer-domain'>zeeurl.com/</div>
        //             <input type='url' id='reducer-input' placeholder='Enter the URL to shorten' required />
        //             <button className='reducer-button'>Minify</button>
        //             <div className='custom-container'>
        //                 <label htmlFor='custom-input'> Want to Customize your link ?</label>
        //                 <input type='text' className="custom-input" placeholder='Enter alias' />
        //             </div>
        //         </form>

        // </div>

        ///////////////////////////////////
        <div className="reducer-container">
            <div className='reducer-random'>
                <span><i className="fa-solid fa-link"></i> Minify a long URL ?</span>
                <form className='reducer-form'>
                    <input type='url' id='reducer-input' placeholder='Enter the URL to shorten' required />
                </form>
            </div>

            <div className='reducer-custom'>
                <form className='reducer-custom-form'>
                    <label htmlFor='custom-input'><i className="fa-solid fa-wand-magic"></i>  Want to Customize your URL ?</label>
                    <input type='text' id='custom-input' className="custom-input" placeholder='Enter alias' />
                </form>

            <button className='reducer-button'>Minify</button>
            </div>
        </div>
    )
}


