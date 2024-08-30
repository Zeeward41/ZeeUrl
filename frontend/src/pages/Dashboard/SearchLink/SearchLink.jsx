import './SearchLink.css'
import { useState } from 'react'

export default function SearchLink({links,setLinkSearch}) {

    const [value, setValue] = useState('')

    function filterMinify(searchElement) {
        if (searchElement !== '') {
        const newArray = []
        
        links.map((li) => {
            const alias = li.token
            const url = li.link_original
            if (alias.includes(searchElement) || url.includes(searchElement)) {
                newArray.push(li)
            }
        })
        setLinkSearch(newArray)
    } else {
        setLinkSearch(links)
    }
    }


    function handleChange(e) {
        const newValue = e.target.value
        setValue(newValue)

        filterMinify(newValue)

        
    }
    return (
        <form className='search-form' >
            <input className='search-input' type='text' placeholder='Search URL' value={value} onChange={handleChange} />
            <div className='search-icon'>
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
        </form>
    )
}