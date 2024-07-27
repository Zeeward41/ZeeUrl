import './MinifyUrl.css'

export default function MinifyUrl() {
    return (
        <div className='url-container'>
            <div className='left-box'>
                <div className='url-qr'>
                    <i class="fa-solid fa-qrcode"></i>
                    <a href='https://www.wuxiaworld.com/' target="_blank" className='minify-url'>https://zeeurl.com/monlink</a>
                    <i className="fa-solid fa-copy"></i>
                </div>
            <a href='https://www.wuxiaworld.com/'target="_blank" className='original-url'>https://www.wuxiaworld.com</a>
            </div>
            <div className='right-box'>
                <div className='box-stats'>
                    <span className='num-stats'>12</span>
                    <i className="fa-solid fa-chart-simple"></i>
                </div>
                <span className='creation-date'>06/29/24</span>
                <button className='url-config'><i className="fa-solid fa-gear"></i><i className="fa-solid fa-caret-down"></i></button>
            </div>
        </div>
    )
}