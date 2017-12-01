import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';


class Sidebar extends Component {
    render() {
        return (
			<div className="sidebar-panel">
				<div className="nav-container">
					<ul>
						<li>
							<NavLink to="/user/profile">
								Profile
							</NavLink>
						</li>
						<li>
							<NavLink to="/user/paymentMethods">
								Payment Methods
							</NavLink>
						</li>
						<li>
							<NavLink to="/user/bookings">
								Past bookings
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
        );
    }

}

export default Sidebar;
