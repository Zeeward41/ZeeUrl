import './Dashboard.css'
import LinkShortener from '../../components/LinkShortener/LinkShortener.jsx'
import SearchLink from '../../components/SearchLink/SearchLink.jsx'

export default function Dashboard() {
    return (
    <div className='outer-container'>
        <div className='dashboard-container'>
            {/* <h1>Dashboard</h1> */}
            <div className='dashboard-left'>
                <LinkShortener />
                <div className='separator' />
            </div>
            <div className='dashboard-right'>
                <SearchLink />
            </div>
        </div>
    </div>
    )
}