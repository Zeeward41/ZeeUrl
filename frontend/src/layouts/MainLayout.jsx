import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar.jsx'

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default MainLayout