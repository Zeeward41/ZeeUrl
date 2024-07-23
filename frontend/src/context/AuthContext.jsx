import { createContext, useContext, useState, useEffect} from 'react'
import { ENDPOINTS } from '../../config'

export const AuthContext = createContext({
    authState: {
        userInfo: null,
        isAuthenticated: false
    },
    setAuthState: () => {}
})

export default function AuthContextProvider({children}) {
    const [authState, setAuthState] = useState({
        userInfo: null,
        isAuthenticated: false
    })
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
                    isAuthenticated: false
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
        logout
    }

    return <AuthContext.Provider
    value={valueAuthContext}>
        {children}
    </AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)