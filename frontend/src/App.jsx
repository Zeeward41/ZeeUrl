import Home from './pages/Home.jsx'
import Signup from './pages/signUP.jsx'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Login.jsx'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'

import MainLayout from './layouts/MainLayout.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
  <>
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Home />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='*' element={<NotFound />}/>
    </Route>

  </>
  ))

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App