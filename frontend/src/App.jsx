import React from 'react'
import {Route, Routes} from 'react-router-dom'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import AuthProtectRoute from './Components/AuthProtectRoute/AuthProtecRoute.jsx'


const App = () => {
  console.log(import.meta.env.VITE_URL_API)
  return (
    <div>
     
      <Routes>s
        <Route path="/" element={<LoginScreen />}/>
        <Route path="/login" element={<LoginScreen />}/>
        <Route path="/resgistro" element={<RegisterScreen />}/>
        
     
        <Route element= {<AuthProtectRoute/>}>
          <Route path="/home" element={<HomeScreen />}/>
        </Route>

      </Routes>
     
    </div>
  )
}

export default App