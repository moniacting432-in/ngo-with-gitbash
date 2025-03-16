import React from 'react'
import { NavLink } from 'react-router-dom';
import './Navbar.css'
import logo from '../../assets/logo_png.png'

const navbar = () => {
  return (
    <nav className='container'>
      <img src={logo} alt="Company logo" className='logo'/>
      <ul>
        
        <li><NavLink to='/'>Hero</NavLink></li>
        <li><NavLink to='/navb'>Navbar</NavLink></li>
        <li><NavLink to='/home'>Home</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>
        <li><NavLink to='/loginSignup'>LoginSignup</NavLink></li>
        <li><button className='btn'><NavLink to='/contact'>contact</NavLink></button></li>
      </ul>
    </nav>
  )
};

export default navbar;
