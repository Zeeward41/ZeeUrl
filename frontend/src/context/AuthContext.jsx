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
            await fetch(endpointLogout, {
                method: "GET",
                credentials: "include"
            })

            setAuthState({
                userInfo: null,
                isAuthenticated: false
            })
        } catch (err) {
            console.log(err)
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