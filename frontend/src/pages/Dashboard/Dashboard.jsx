import './Dashboard.css'
import LinkShortener from './LinkShortener/LinkShortener.jsx'
import SearchLink from './SearchLink/SearchLink.jsx'
import MinifyUrl from './MinifyUrl/MinifyUrl.jsx'
import UsageStats from './UsageStats/UsageStats.jsx'
import { useState,useEffect } from 'react'
import { ENDPOINTS } from '../../../config.js'

export default function Dashboard() {

    const endpointGetUrls = ENDPOINTS.GETURLS
    const [links, setLinks] = useState([])

    async function loadData() {

        const response = await fetch(endpointGetUrls, {
            method: "GET",
            credentials: "include"
        })

        const json = await response.json()
        
        if (json.success) {
            setLinks(json.data)
        }
    }

    useEffect(() => {
        loadData()
    },[])
    
    return (
    <div className='outer-container'>
        <div className='dashboard-container'>
            <div className='dashboard-left'>
                <LinkShortener />
                {/* <div className='separator' /> */}
                {links.map((link) => {
                    return (
                    <MinifyUrl 
                    key={link.token}
                    linkOriginal={link.link_original}
                    token={link.token}
                    numVisit={link.num_visit}
                    createdAt={link.createdAt}
                    />
                    )
                })}

            </div>
            <div className='dashboard-right'>
                <SearchLink />
                <UsageStats />
            </div>
        </div>
    </div>
    )
}