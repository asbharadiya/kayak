import React, { Component } from 'react';
import './profile.css';
import Sidebar from './../sidebar/sidebar';

class Profile extends Component {

    render() {
        return (
		  	<div className="profile-page-wrapper">
	        	<Sidebar/>
	  			<div className="page-content">
		          {this.props.children}
		        </div>
  			</div>
        );
    }
}

export default Profile;
