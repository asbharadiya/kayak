import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import './Responsive.css';
import * as actions from './actions/auth';
import Header from './components/header/header';
import Landing from './components/landing/landing';

class App extends Component {

  componentDidMount(){
    this.props.checkSession();
  }

  render() {
    const isLogged = this.props.isLogged;
    return (
      <div className="page-wrapper">
      <Header/>
      {
        isLogged === undefined ? (
          <div className="text-center"><h1>Loading...</h1></div>
        ) : (
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Landing}/>
            </Switch>
          </BrowserRouter>
        )
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {isLogged:state.isLogged};
}

function mapDispatchToProps(dispatch) {
    return {
        checkSession : () => dispatch(actions.checkSession())
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
