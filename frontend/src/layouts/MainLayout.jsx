import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar.jsx'
import React from 'react'
import { ENDPOINTS } from '../../config.js'
import { useNavigate} from 'react-router-dom'

const MainLayout = () => {

    const [isAuthenticated, setIsAuthenticated] = React.useState(null)
    const [userInfo, setUserInfo] = React.useState(null)
    const navigate = useNavigate()
    const endpointCheck = ENDPOINTS.CHECK_AUTH

    React.useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(endpointCheck, {
                    method: "GET",
                    credentials: "include"
                })

                if (!response.ok) {
                    throw new Error('Network response failed')
                }

                const json = await response.json()

                if (json.success) {
                    setUserInfo(json.data)
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                    setUserInfo(null)
                }
            } catch (err) {
                setIsAuthenticated(false)
                setUserInfo(null)
            }
        }
        checkAuth()
    }, [])

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} userInfo={userInfo} />
            <Outlet context={{setIsAuthenticated, setUserInfo}}/>
        </>
    )
}

export default MainLayout