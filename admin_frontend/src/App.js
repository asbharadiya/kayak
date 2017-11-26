import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import './Responsive.css';
import * as actions from './actions/auth';
import Signin from './components/signin/signin';
import Dashboard from './components/dashboard/dashboard';
import Home from './components/dashboard/home/home';
import Cars from './components/dashboard/cars/cars';
import Flights from './components/dashboard/flights/flights';
import Hotels from './components/dashboard/hotels/hotels';

class App extends Component {

  componentDidMount(){
    this.props.checkSession();
  }

  render() {
    const isLogged = this.props.isLogged;
    return (
      <div className="page-wrapper">
      {
        isLogged === undefined ? (
          <div className="text-center"><h1>Loading...</h1></div>
        ) : (
          <BrowserRouter>
            <Switch>
              <Route exact path='/' render={() => (
                isLogged ? (
                  <Redirect to="/home"/>
                ) : (
                  <Signin/>
                )
              )}/>
              <Dashboard>
                <Route path='/home' render={() => (
                  !isLogged ? (
                    <Redirect to="/"/>
                  ) : (
                    <Home/>
                  )
                )}/>
                <Route path='/cars' render={() => (
                  !isLogged ? (
                    <Redirect to="/"/>
                  ) : (
                    <Cars/>
                  )
                )}/>
                <Route path='/flights' render={() => (
                  !isLogged ? (
                    <Redirect to="/"/>
                  ) : (
                    <Flights/>
                      )
                )}/>
                <Route path='/hotels' render={() => (
                  !isLogged ? (
                    <Redirect to="/"/>
                  ) : (
                    <Hotels/>
                  )
                )}/>
              </Dashboard>
            </Switch>
          </BrowserRouter>
        )
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {isLogged:state.authReducer.isLogged};
}

function mapDispatchToProps(dispatch) {
  return {
      checkSession : () => dispatch(actions.checkSession())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
