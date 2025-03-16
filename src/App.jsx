import React from 'react'
import Hero from './components/Hero/Hero'
import Navbar from './components/navbar/Navbar'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import LoginSignup from './components/LoginSignup'
import Dashboard from './Dashboard/client/src/services/Dashboard'
const App = () => {
  return <>
    <BrowserRouter>
      <Routes>
      
      <Route path='/' element={<Hero/>}></Route>
      <Route path='/navb' element={<Navbar/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/loginsignup' element={<LoginSignup/>}></Route>
      <Route path='/dash' element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  </>
}

export default App
