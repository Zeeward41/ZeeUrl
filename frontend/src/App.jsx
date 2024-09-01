import Home from './pages/Home/Home.jsx'
import Signup from './pages/signUp/signUP.jsx'
import Login from './pages/Login/Login.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Stats from './pages/Stats/Stats.jsx'
import RedirectAlias from './components/RedirectAlias/RedirectAlias.jsx'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import AuthContextProvider from './context/AuthContext.jsx'

import MainLayout from './layouts/MainLayout.jsx'

import NotFound from './pages/NotFound/NotFound.jsx'
import Unauthorized from './pages/Unauthorized/Unauthorized.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
  <>
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Home />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/stats' element={<Stats />} />
      <Route path='/:alias' element={<RedirectAlias />} />
      <Route path='/notfound' element={<NotFound />}/>
      <Route path='/unauthorized'element={<Unauthorized />}/>
    </Route>

  </>
  ))

const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  )
}

export default App