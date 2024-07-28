import './SearchLink.css'

export default function SearchLink() {
    return (
        <form className='search-form'>
            <input className='search-input' type='text' placeholder='Search URL' />
            <button className='search-button'>
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
    )
}