import './Dashboard.css'
import LinkShortener from './LinkShortener/LinkShortener.jsx'
import SearchLink from './SearchLink/SearchLink.jsx'
import MinifyUrl from './MinifyUrl/MinifyUrl.jsx'
import UsageStats from './UsageStats/UsageStats.jsx'
import { useState,useEffect } from 'react'
import { ENDPOINTS } from '../../../config.js'
import { toast } from 'react-toastify'

import { useAuthContext } from '../../context/AuthContext.jsx'
import { useNavigate, useLocation } from 'react-router-dom'

import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader.jsx'

export default function Dashboard() {

    const endpointGetUrls = ENDPOINTS.GETURLS
    const [links, setLinks] = useState([])
    const [linkSearch, setLinkSearch] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const location = useLocation()

    async function loadData() {
        setLoading(true)
        try {
            
        const response = await fetch(endpointGetUrls, {
            method: "GET",
            credentials: "include"
        })


        if (!response.ok) {
            switch (response.status) {
                case 401:
                    window.location.href = '/login'
                    break
                case 403:
                    navigate('/forbidden', { state: { from: location}, replace: true})
                    break
                case 404:
                    toast.info("you don't have any URL yet.")
                    setLoading(false)
                    break
            }
        }
        const json = await response.json()

        
        if (json.success) {
            setLinks(json.data)
            setLinkSearch(json.data)
            setLoading(false)
        }
    } catch (error) {
        toast.error('something went wrong')
            navigate('/login', { state: { from: location}, replace: true})
    } 
    
    }

    useEffect(() => {
        loadData()
    },[])

    if(loading) {
        return <SpinnerLoader />
    }

    
    return (
    <div className='outer-container'>
        <div className='dashboard-container'>
            <div className='dashboard-left'>
                <LinkShortener />
                {linkSearch.map((link) => {
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
                <SearchLink links={links} setLinkSearch={setLinkSearch} /> 
                <UsageStats />
            </div>
        </div>
    </div>
    )
}
