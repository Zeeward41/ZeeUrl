import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext.jsx'

import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader.jsx'

export default function PrivateRoute({ children }) {
    const {authState} = useAuthContext()
    if (authState.isAuthenticated === null) {
        return <SpinnerLoader />
    }
    return authState.isAuthenticated ? children : <Navigate to='/login' />

}