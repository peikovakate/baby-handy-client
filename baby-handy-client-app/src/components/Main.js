import React from "react"
import {Switch, Route} from 'react-router-dom'
import Home from './Home'
import About from './About'
import SignIn from './SignIn'
import SignUp from './SignUp'


const Main = props => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/signin' component={SignIn}/>
            <Route path='/signup' component={SignUp}/>
        </Switch>
    </main>
);

export default Main
