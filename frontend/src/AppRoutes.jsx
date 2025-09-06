import React from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'


const AppRoutes = () => {
  return (
       <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
        </Routes>
       </BrowserRouter>
  )
}

export default AppRoutes