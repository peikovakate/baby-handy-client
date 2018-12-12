import React, { Component } from 'react';
import './App.css';
import { Header, SignIn, SignUp, PrivateRoute } from "./_components"
import { Switch, Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from './_helpers';
import { alertActions } from './_actions';
import Home from './_components/Home'
import About from './_components/About'
import { AddChild } from './_components/AddChild'
import { ChildList }  from './_components/ChildList'
import Baby from './_components/Baby';


class App extends Component {

  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
        // clear alert on location change
        dispatch(alertActions.clear());   
    });
}

  render() {
    const { alert } = this.props;
    return (
      <Router history={history}>
        <div>
          <div className='layer'>
          <Header/>
            {/* ${alert.type} */}
            { alert.message &&
              <div className='card-panel'>{alert.message}</div>
            }

            <main>
            
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/about' component={About}/>
                <Route path='/signin' component={SignIn}/>
                <Route path='/signup' component={SignUp}/>
                <PrivateRoute  path='/addchild' component={AddChild}/>
                <PrivateRoute path='/childlist' component={ChildList}/>
              </Switch>
            </main>
            <div className='container'>
              {/* <Baby/> */}
            </div>
            
        </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) { 
  const { alert } = state;
  return {
      alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 