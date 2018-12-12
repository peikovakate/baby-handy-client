import React from "react"
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';  
// component that decide what buttons to show depending on if user logged in
class HeaderLinks extends React.Component{
  render(){
    if (localStorage.getItem('user')) {
      return(
         <div className='right'> 
          <li><NavLink to='/addchild'>Add child</NavLink></li> 
          <li><NavLink to='/childlist'>Child List</NavLink></li> 
          <li><NavLink to='/signin'>Log Out</NavLink></li>

          {/* <li><NavLink to='/' className='btn btn-floating grey'>NN</NavLink></li>  */}
        </div>);
    }else {
      return(
        <div className='right'> 
          <li><NavLink to='/signin'>Log In</NavLink></li>
          <li><NavLink to='/signup'>Register</NavLink></li>
        </div>)
    }
  }
}

// Header, some panel will be here
class Header extends React.Component{
  render(){
    return(
    <header>
      <nav className=' cyan lighten-1'>
        <ul className='right'>    
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/about'>About</NavLink></li>
          {/* <HeaderLinks/> */}
          {localStorage.getItem('user') && <li><NavLink to='/addchild'>Add child</NavLink></li>}
          {localStorage.getItem('user') &&  <li><NavLink to='/childlist'>Child List</NavLink></li>}
          {localStorage.getItem('user') &&  <li><NavLink to='/signin'>Log Out</NavLink></li>}
          
          {!localStorage.getItem('user') && <li><NavLink to='/signin'>Log In</NavLink></li>}
          {!localStorage.getItem('user') && <li><NavLink to='/signup'>Register</NavLink></li>}
        </ul>
      </nav>
    </header>
    )}  
}

function mapStateToProps(state) {
  const { authentication } = state;
  const user = authentication
  return {
      user
  };
}

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };