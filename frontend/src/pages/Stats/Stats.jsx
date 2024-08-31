import './Stats.css'
import DateRangePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState, useEffect, useCallback } from 'react'
import { parseISO } from 'date-fns'
import { ENDPOINTS } from '../../../config'
import { useSearchParams } from 'react-router-dom'
import { WEB_SITE_URL } from '../../../config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Stats() {
    // router
    const navigate = useNavigate()
    // switch totalVisit and uniqueVisit
    const [active, setActive] = useState('all')
    // message
    const [statState, setStatState] = useState('idle')
    // endpoint
    const endpointStats = ENDPOINTS.STATSURL
    // query params
    const [searchParams, setSearchParams] = useSearchParams()
    const alias = searchParams.get('alias')
    const startDateParam = searchParams.get('startDate')
    const endDateParam = searchParams.get('endDate')
    // data page
    const [linkInfo, setLinkInfo] = useState('')
    const [dataStats, setDataStats] = useState({
        totalVisits: 0,
        averageDaily: 0,
        averageWeekly: 0,
        averageMonthly: 0,
        uniqueVisits: 0,
        averageDailyUnique: 0,
        averageWeeklyUnique: 0,
        averageMonthlyUnique: 0
    })
    // date calendar
    const [dateRange, setDateRange] = useState([])
    let [startDate, endDate] = dateRange


    function handleChoice(option) {
        setActive(option)
    }

    const fetchStats = async (startDate, endDate) => {


        const fullEndpoint = `${endpointStats}?alias=${alias}${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`
        
        try { 
            // setStatState('loading')
        const response = await fetch(fullEndpoint, {
            method: "GET",
            credentials: "include",
        })

        const json = await response.json()

        if(json.success) {
            // setStatState('success')
            const newDict = json.data.stats
            setDataStats(newDict)

            setLinkInfo(json.data.link)
            setDateRange([json.data.date.startDate.toString(), json.data.date.endDate.toString()]) // update calendar date and change to adequat format
        
        }

        if (!response.ok) {
            switch (response.status) {
                case 404:
                    toast.error('URL not found')
                    navigate('/')
                    break
                case 401:
                    toast.error('Not authorized')
                    navigate('/')
                    break
                default:
                    toast.error('Something went wrong!')
                    navigate('/')
            }
            // setStatState('error')
        }

    } catch (error) {
        toast.error('Something went wrong! try again')
        navigate('/')
        // setStatState('error')
        }
    } 
    


    useEffect(() => {

        fetchStats(startDateParam, endDateParam)

        return () => {
            fetchStats(startDateParam, endDateParam)
        }
    }, [])

    function handleCalendarClose(startDate, endDate) {
        // if date null -> today date
        if (!startDate) {
            startDate = new Date()
        }

        if (!endDate) {
            endDate = new Date()
        }
        
        // 86400000 ms (24 hours) added to endDate to capture the full day, ensuring the same date range includes the entire day
        fetchStats(startDate.getTime()/1000, (endDate.getTime() + 86400000 - 1)/1000) // format to timestamp /1000
        
        
    }
   
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => toast.success('Copied to clipboard!'))
            .catch(() => toast.error('Failed to copy'))
    }


    return (
        <div className='stats-container'>
            <div className='stats-recap'>
                <div className='stats-count'>
                    <div className='stats-count-box stats-total'>{dataStats.totalVisits}<span>Total Visits</span></div>
                    <div className='stats-count-box stats-unique'>{dataStats.uniqueVisits}<span>Unique Visits</span></div>
                </div>
                <div className='stats-link'>
                    <div className='stats-link-box token'>
                        <a href={`${WEB_SITE_URL}/${linkInfo.token}`} target={'_blank'}>{`${WEB_SITE_URL}/${linkInfo.token}`}</a>
                        <button className='stats-copy token' onClick={() => handleCopy(`${WEB_SITE_URL}/${linkInfo.token}`)}>Copy</button>
                    </div>
                    <div className='stats-link-box original'>
                        <a href={linkInfo.link_original} target={'_blank'}>{linkInfo.link_original}</a>
                        <button className='stats-copy original' onClick={() => handleCopy(linkInfo.link_original)}>Copy</button>
                    </div>
                    <span className='stats-date-creation'>Created : {new Date(linkInfo.createdAt).toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        jour12: true})
                        }
                        </span>
                </div>
            </div>
            <div className='stats-average'>
                <DateRangePicker className='calendar'
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                    setDateRange(update)
                }}
                dateFormat='yyyy/MM/dd'
                showYearDropdown
                scrollableMonthYearDropdown
                onCalendarClose={() => handleCalendarClose(startDate, endDate)}
                maxDate={new Date()}
                minDate={linkInfo.createdAt || parseISO('2024-05-10')}
                />
                <div className='stats-choice-visits'>
                    <span 
                    id='all-stats' 
                    className={`stats-choice-box ${active === 'all' ? 'active' :''}`}
                    onClick={() => {handleChoice('all')}}
                    >All Stats</span>
                    <span 
                    id='unique-stats' 
                    className={`stats-choice-box ${active === 'unique' ? 'active': ''}`}
                    onClick={() => {handleChoice('unique')}}
                    >Unique Stats</span>
                </div>
                <div className='stats-average-result'>
                    <div className='stats-average-box daily'>
                        <span className='header'>Average Daily</span>
                        <span className='value'>{active === 'all' ? dataStats.averageDaily : dataStats.averageDailyUnique}</span>
                    </div>
                    <div className='stats-average-box weekly'>
                        <span className='header'>Average Weekly</span>
                        <span className='value'>{active === 'all' ? dataStats.averageWeekly : dataStats.averageWeeklyUnique}</span>
                    </div>
                    <div className='stats-average-box Monthly'>
                        <span className='header'>Average Monthly</span>
                        <span className='value'>{active === 'all' ? dataStats.averageMonthly : dataStats.averageMonthlyUnique}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}