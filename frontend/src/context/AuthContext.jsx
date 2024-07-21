import { createContext, useContext, useState} from 'react'

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

    const valueAuthContext = {
        authState,
        setAuthState
    }


    return <AuthContext.Provider
    value={valueAuthContext}>
        {children}
    </AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)