import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import './sidebar.responsive.css';

class Sidebar extends Component {
  	
  render() {
  	return (
  		<div className="sidebar-panel">
  			<div className="sidebar-panel-container">
  				<div className="logo-container">
  					<NavLink to="/home">
	              	<img src="/assets/images/kayak-logo.png" alt="logo" className="logo-icon"/>
	            </NavLink>
  				</div>
  				<div className="nav-container">
  					<ul>
  						<li>
  							<NavLink to="/home">
  								Home
  							</NavLink>
  						</li>
  						<li>
  							<NavLink to="/hotels">
  								Hotels
  							</NavLink>
  						</li>
              <li>
                <NavLink to="/flights">
                  Flights
                </NavLink>
              </li>
              <li>
                <NavLink to="/cars">
                  Cars
                </NavLink>
              </li>
              <li>
                <NavLink to="/customers">
                  Customers
                </NavLink>
              </li>
              <li>
                <NavLink to="/billings">
                  Billings
                </NavLink>
              </li>
              <li>
	              <NavLink to="/console">
	                Admin Console
	              </NavLink>
	            </li>
              <li>
	              <NavLink to="/host">
	                Host Console
	              </NavLink>
	            </li>
  					</ul>
  				</div>
  			</div>
  		</div>
  	);
	}

}

export default Sidebar;
