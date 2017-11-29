import React, { Component } from 'react';
import './profile.css';
import Sidebar from './../sidebar/sidebar';

class Profile extends Component {

    render() {
        return (
		  	<div className="profile-page-wrapper">
	        	<Sidebar/>
	  			<div className="page-content">
		          <h2>This is profile page</h2>
		        </div>
  			</div>
        );
    }
}

export default Profile;
