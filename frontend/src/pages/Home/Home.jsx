import './Home.css'

export default function Home() {
    return (
       <div className='home-container'>
            <h1>Welcome on ZeeURL</h1>
            <div className='home-text'>
                <h2>Quick and easy minify URL</h2>
                <p>Create short, <strong>easy-to-share</strong> URLs in seconds! <strong>ZeeUrl</strong> lets you quickly minify lengthy links from Instagram, Facebook, YouTube, Twitter, LinkedIn, WhatsApp, TikTok, blogs, and more. <strong>Simply</strong> paste your long URL, hit the "<strong>Minify URL</strong>" button, and you'll get a minify link ready to be shared across websites, chats, and emails. Track the number of clicks your link receives after it's minified!</p>
                <h2>Minify, share, and track</h2>
                <p>Your <strong>minified URLs</strong> can be used in articles, documents, ads, blogs, forums, messages, and more. Keep an eye on your business and project performance by tracking the number of clicks with our <strong>built-in analytics</strong>.</p>
            </div>
            <div className='home-box'>
                <div className='home-box-easy box'>
                    <i className='fa-regular fa-thumbs-up fa'></i>
                    <span>Easy</span>
                    <p>ZeeUrl is quick and simple -- just enter your long link to get a shortened version instantly.</p>
                </div>
                <div className='home-box-minified box'>
                    <i className='fa-solid fa-link fa'></i>
                    <span>Minified</span>
                    <p>No matter the length, ZeeUrl can shorten any link.</p>
                </div>
                <div className='home-box-stats box'>
                    <i className='fa-solid fa-chart-simple fa'></i>
                    <span>Statistics</span>
                    <p>Track the number of clicks your minified URL has received.</p>
                </div>

            </div>
       </div> 
    )
}
