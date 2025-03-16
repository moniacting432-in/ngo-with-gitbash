import React from 'react'
import './Hero.css'
import logo from '../../assets/logo_png.png'
import { NavLink } from 'react-router-dom'

const Hero = () => {
  return (
    <div class="hero">
      <nav className='container'>
    <img src={logo}alt="" className='logo'/>
    <ul>
        <li><NavLink to='/home'>Home</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>
        <li><NavLink to='/loginSignup'>LoginSignup</NavLink></li>
        <li><NavLink to='/contact'>Contact</NavLink></li>
        <li><NavLink to='/dash'>Dashboard</NavLink></li>
    </ul>
      
    </nav>
    
    </div>
      )
}

export default Hero
