import React from "react"
import { withRouter, NavLink } from 'react-router-dom'
// component that decide what buttons to show depending on if user logged in
class HeaderLinks extends React.Component{
  render(){
    if (localStorage.getItem('user')) {
      return(
         <ul className='right'> 
          <li><NavLink to='/addchild'>Add child</NavLink></li> 
          <li><NavLink to='/childlist'>Child List</NavLink></li> 
          <li><NavLink to='/signin'>Log Out</NavLink></li>

          {/* <li><NavLink to='/' className='btn btn-floating grey'>NN</NavLink></li>  */}
        </ul>);
    }else {
      return(
        <ul className='right'> 
          <li><NavLink to='/signin'>Sign In</NavLink></li>
          <li><NavLink to='/signup'>Sign Up</NavLink></li>
        </ul>)
    }
  }
}

// Header, some panel will be here
export class Header extends React.Component{
  render(){
    return(
    <header>
      <nav>
        <ul className='right'>    
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/about'>About</NavLink></li>
          <HeaderLinks/>
        </ul>
      </nav>
    </header>
    )}  
}

export default Header;

