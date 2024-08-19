import Home from './pages/Home.jsx'
import Signup from './pages/signUp/signUP.jsx'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Login/Login.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Stats from './pages/Stats/Stats.jsx'
import RedirectAlias from './components/RedirectAlias/RedirectAlias.jsx'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import AuthContextProvider from './context/AuthContext.jsx'

import MainLayout from './layouts/MainLayout.jsx'

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
      <Route path='*' element={<NotFound />}/>
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