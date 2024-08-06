import './Dashboard.css'
import LinkShortener from './LinkShortener/LinkShortener.jsx'
import SearchLink from './SearchLink/SearchLink.jsx'
import MinifyUrl from './MinifyUrl/MinifyUrl.jsx'
import UsageStats from './UsageStats/UsageStats.jsx'

export default function Dashboard() {

    
    return (
    <div className='outer-container'>
        <div className='dashboard-container'>
            <div className='dashboard-left'>
                <LinkShortener />
                {/* <div className='separator' /> */}
                <MinifyUrl />
                <MinifyUrl />
                <MinifyUrl />

            </div>
            <div className='dashboard-right'>
                <SearchLink />
                <UsageStats />
            </div>
        </div>
    </div>
    )
}