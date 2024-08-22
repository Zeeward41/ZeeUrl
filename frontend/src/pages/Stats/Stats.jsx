import './Stats.css'
import DateRangePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import { parseISO } from 'date-fns'

export default function Stats() {
    const minDate = parseISO('2021-05-20')
    const [dateRange, setDateRange] = useState([new Date(), new Date()])
    const [startDate, endDate] = dateRange
    const [active, setActive] = useState('all')
    
    function handleChoice(option) {
        setActive(option)
    }

    return (
        <div className='stats-container'>
            <div className='stats-recap'>
                <div className='stats-count'>
                    <div className='stats-count-box stats-total'>1<span>Total Visits</span></div>
                    <div className='stats-count-box stats-unique'>12<span>Unique Visits</span></div>
                </div>
                <div className='stats-link'>
                    <div className='stats-link-box token'>
                        <span>token</span>
                        <button className='stats-copy token'>Copy</button>
                    </div>
                    <div className='stats-link-box original'>
                        <span>original_linkdddddddddddddddddddddddddddd</span>
                        <button className='stats-copy original'>Copy</button>
                    </div>
                    <span className='stats-date-creation'>Created : 08/17/24 2:24:51pm</span>
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
                maxDate={new Date()}
                minDate={minDate}
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
                        <span className='value'>0</span>
                    </div>
                    <div className='stats-average-box weekly'>
                        <span className='header'>Average Weekly</span>
                        <span className='value'>0</span>
                    </div>
                    <div className='stats-average-box Monthly'>
                        <span className='header'>Average Monthly</span>
                        <span className='value'>0</span>
                    </div>
                </div>
            </div>
        </div>
    )
}