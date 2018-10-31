import React from "react"
import {Switch, Route} from 'react-router-dom'
import Home from './Home'
import About from './About'
import SignIn from './SignIn'
import SignUp from './SignUp'
import AddChild from './AddChild'
import ChildList from './ChildList'


const Main = props => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/signin' component={SignIn}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/addchild' component={AddChild}/>
            <Route path='/childlist' component={ChildList}/>
        </Switch>
    </main>
);

export default Main
