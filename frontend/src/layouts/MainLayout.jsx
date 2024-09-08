import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar.jsx'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext.jsx'
import ModalMessageContextProvider from '../context/ModalMessageContext.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from '../components/Footer/Footer.jsx'
import './MainLayout.css'

import SpinnerLoader from '../components/SpinnerLoader/SpinnerLoader.jsx'

const MainLayout = () => {

    const { authState, checkAuthStatus} = useAuthContext()

    useEffect(() => {
        // const checkAuth = async () => {
        // await checkAuthStatus()
        // }
    
        // checkAuth()
        checkAuthStatus()
       }, []) 
    
        if(authState.isLoading) {
            return <SpinnerLoader />
        }
  
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