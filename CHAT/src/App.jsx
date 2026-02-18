import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import {Toaster} from 'react-hot-toast'
import { useContext } from 'react'
import {AuthContext} from '../context/authContext.jsx'
function App() {
  const {authUser} = useContext(AuthContext);
  return (
    <div className="bg-[url('/bgImage.svg')]
     bg-contain"> 
     <Toaster/>
    <Routes>
      <Route path='/' element = {authUser?<Home/> : <Navigate to = "/login"/>}></Route>
      <Route path='/login' element = {!authUser ? <Login/>:<Navigate to= "/" />}> </Route>
      <Route path='/profile' element = {authUser ?<Profile/>: <Navigate to="/"/>}></Route>
    </Routes>
      

     </div>
  )
}

export default App
