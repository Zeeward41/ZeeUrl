import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar.jsx'
import React from 'react'
import { ENDPOINTS } from '../../config.js'
import { useAuthContext } from '../context/AuthContext.jsx'
import ModalMessageContextProvider from '../context/ModalMessageContext.jsx'

const MainLayout = () => {

    const { authState, setAuthState} = useAuthContext()

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
                    setAuthState({
                        userInfo: json.data,
                        isAuthenticated: true
                    })
                } else {
                    setAuthState({
                        userInfo: null,
                        isAuthenticated: false
                    })
                }
            } catch (err) {
                setAuthState({
                    userInfo: null,
                    isAuthenticated: false
                })
            }
        }
        checkAuth()
    }, [])

    return (
        <>
            <ModalMessageContextProvider>
                <Navbar />
            </ModalMessageContextProvider>
            <Outlet />
        </>
    )
}

export default MainLayout