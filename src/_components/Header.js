import React from "react"
import { NavLink } from 'react-router-dom'

// Header, some panel will be here
export const Header = props => (
  <header>
    <nav>
      <ul className='right'>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>
        <li><NavLink to='/signin'>Sign In</NavLink></li>
        <li><NavLink to='/signup'>Sign Up</NavLink></li>
        <li><NavLink to='/addchild'>Add child</NavLink></li>
        <li><NavLink to='/childlist'>Child List</NavLink></li>
        <li><NavLink to='/' className='btn btn-floating grey'>NN</NavLink></li>
      </ul>
    </nav>
  </header>
);

// export default Header
