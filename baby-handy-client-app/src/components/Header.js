import React from "react"
import { Link } from 'react-router-dom'

// Header, some panel will be here
const Header = props => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/signin'>Sign In</Link></li>
        <li><Link to='/signup'>Sign Up</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header
