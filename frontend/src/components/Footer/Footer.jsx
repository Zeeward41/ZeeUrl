import './Footer.css'

export default function Footer() {
    return (
        <footer className='footer'>
            <p className='footer-reserved'>&copy; 2025 ZeeUrl. All rights reserved.</p>
            <div className="footer-social-links">
                <a href="https://x.com/zeeward41" className='footer-x'target="_blank"><i className='fa-brands fa-x-twitter'></i>Twitter</a>
                <a href="https://github.com/Zeeward41" className='footer-github' target="_blank"><i className='fa-brands fa-github'></i>Github</a>
            </div>
        </footer>
    )
}