import React, { Component } from 'react';
import './dashboard.css';
import './dashboard.responsive.css';
import Sidebar from './sidebar/sidebar';
import Header from './header/header';

class Dashboard extends Component {
	
  render() {
    return (
  		<div className="dashboard-page-wrapper">
        <Sidebar/>
  			<div className="page-content">
          <Header/>
          <div className="inner-page-content">
  				  {this.props.children}
          </div>
  			</div>
  		</div>
  	);
	}
  
}

export default Dashboard;
