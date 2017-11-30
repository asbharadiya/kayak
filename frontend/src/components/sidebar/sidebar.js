import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';


class Sidebar extends Component {
  render() {
  	return (
  		<div className="sidebar-panel">
  			<div className="sidebar-panel-container">
  				<div className="nav-container">
  					<ul>
  						<li>
  							<NavLink to="/user/profileInfo">
  								Profile
  							</NavLink>
  						</li>
  						<li>
  							<NavLink to="/user/payments">
  								Payment Methods
  							</NavLink>
  						</li>
              <li>
                <NavLink to="/user/history">
                  History
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
