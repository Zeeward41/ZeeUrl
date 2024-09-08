import { createContext, useContext, useState, useEffect} from 'react'
import { ENDPOINTS } from '../../config'

export const AuthContext = createContext({
    authState: {
        userInfo: null,
        isAuthenticated: null,
        isLoading: true
    },
    setAuthState: () => {}
})

export default function AuthContextProvider({children}) {
    const [authState, setAuthState] = useState({
        userInfo: null,
        isAuthenticated: null,
        isLoading: true
    })

    const checkAuthStatus = async () => {
        // Simuler un délai de reponse backend
        await new Promise(resolve => setTimeout(resolve, 1500))

        try {
            const response = await fetch(ENDPOINTS.CHECK_AUTH, {
                method: "GET",
                credentials: "include"
            })

            const json = await response.json()

            setAuthState({
                userInfo: json.data.user,
                isAuthenticated: json.data.isAuthenticated,
                isLoading: false
            })

        } catch (error) {
            setAuthState({
                userInfo: null,
                isAuthenticated: false,
                isLoading: false
            })
        }
    }

    const endpointLogout = ENDPOINTS.LOGOUT

    const logout = async () => {
        try {
            const response = await fetch(endpointLogout, {
                method: "GET",
                credentials: "include"
            })

            const json = await response.json()

            if (!response.ok) {
                throw new Error(json.error || 'Unexpected error!')
            }

            if(json.success) {
                setAuthState({
                    userInfo: null,
                    isAuthenticated: false,
                    isLoading: false
                })
                return json
            }


        } catch (err) {
            return {
                success: false,
                message: err.message
            }
        }
    }

    const valueAuthContext = {
        authState,
        setAuthState,
        logout,
        checkAuthStatus
    }

    return <AuthContext.Provider
    value={valueAuthContext}>
        {children}
    </AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)