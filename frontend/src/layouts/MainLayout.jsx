import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar.jsx'
import React from 'react'
import { ENDPOINTS } from '../../config.js'
import { useAuthContext } from '../context/AuthContext.jsx'
import ModalMessageContextProvider from '../context/ModalMessageContext.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from '../components/Footer/Footer.jsx'
import './MainLayout.css'

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
        <div className='jojo'>
            <ModalMessageContextProvider>
                <div className="page-content">
                    <Navbar />
                    <Outlet />
                </div>
                <Footer />
            </ModalMessageContextProvider>
            <ToastContainer />

        </div>
    )
}

export default MainLayout