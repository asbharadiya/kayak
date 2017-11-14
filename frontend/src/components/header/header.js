import React, { Component } from 'react';
import {connect} from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import './header.css';

class Header extends Component {

  	render() {
      return (
      		<header className={(this.props.location.pathname === "/hotels" 
            || this.props.location.pathname === "/flights"
            || this.props.location.pathname === "/cars") ? "":"solid"}>
      			<div className="header-wrapper">
      				<div className="logo-container">
      					<NavLink to="/">
      						<img src="/assets/images/kayak-logo.png" alt="logo"/>
      					</NavLink>
      				</div>
      				<div className="nav-container">
      					<ul className="nav">
      						<li className="nav-item">
      							<NavLink to="/hotels">
      								Hotels
      							</NavLink>
      						</li>
      						<li className="nav-item">
      							<NavLink to="/flights">
      								Flights
      							</NavLink>
      						</li>
      						<li className="nav-item">
      							<NavLink to="/cars">
      								Cars
      							</NavLink>
      						</li>
      					</ul>
      				</div>
      				<div className="menu-container">
      					<a>
	      					<i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
	      					<span>My Account</span>
      					</a>
      				</div>
      			</div>
      		</header>
    	);
  	}
}


function mapStateToProps(state) {
    return {isLogged:state.isLogged};
}

export default withRouter(connect(mapStateToProps)(props => <Header {...props}/>));
