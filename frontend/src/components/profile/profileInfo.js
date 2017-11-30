import React, { Component } from 'react';
import './profileInfo.css';
import Sidebar from './../sidebar/sidebar';
import {getUserDetails } from '../../actions/profile'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class ProfileInfo extends Component {

    componentDidMount(){
        this.props.getUserDetails()
    }

    render() {
    	console.log('State')
    	console.log(this.props.profile[0])
    	if(this.props.profile[0]===undefined)
    	{	
	        return (
			  	<div className="profile-page-wrapper">
		        	<div className="row profile-page-header">
		        		<h2>Profile</h2>
		        	</div>
		        	<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 RowDiv"> 
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4  RowData">
		        			First Name
		        		</div>
		        		<div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 ">
		        			
		        		</div>

		        	</div>
		        	<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 RowDiv"> 
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4  RowData">
		        			Last Name
		        		</div>
		        		<div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 ">
		        			
		        		</div>

		        	</div>
		        	<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 RowDiv"> 
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4  RowData">
		        			Email
		        		</div>
		        		<div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 ">
		        			
		        		</div>

		        	</div>
		        	<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 RowDiv"> 
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4  RowData">
		        			Address
		        		</div>
		        		<div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 ">
		        			
		        		</div>

		        	</div>
		        	<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 RowDiv"> 
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4  RowData">
		        			City
		        		</div>
		        		<div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 ">
		        			
		        		</div>

		        	</div>
		        	<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 RowDiv"> 
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4  RowData">
		        			State
		        		</div>
		        		<div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 ">
		        			
		        		</div>

		        	</div>
		        	<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 RowDiv"> 
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4  RowData">
		        			Zip Code
		        		</div>
		        		<div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 ">
		        			
		        		</div>

		        	</div>
		        	<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 RowDiv"> 
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4 RowData ">
		        			Phone
		        		</div>
		        		<div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 ">
		        			
		        		</div>

		        	</div>

	  			</div>
	        );
	    }
	    else{
	    	return (
			  	<div className="profile-page-wrapper">
		        	<div className="row profile-page-header">
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4">
		        			<h2>Profile</h2>
		        		</div>
		        		<div className="col-md-8 col-sm-8 col-lg-8 col-xs-8">
		        		<button type="button" className="btn btn-default  btn-kayak pull-right">Edit</button>
		        		</div>
		        	</div>
		        	<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 RowDiv"> 
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4  RowData">
		        			First Name
		        		</div>
		        		<div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 ">
		        			{this.props.profile[0].firstName}
		        		</div>

		        	</div>
		        	<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 RowDiv"> 
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4  RowData">
		        			Last Name
		        		</div>
		        		<div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 ">
		        			{this.props.profile[0].lastName}
		        		</div>

		        	</div>
		        	<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 RowDiv"> 
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4  RowData">
		        			Email
		        		</div>
		        		<div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 ">
		        			{this.props.profile[0].email}
		        		</div>

		        	</div>
		        	<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 RowDiv"> 
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4  RowData">
		        			Address
		        		</div>
		        		<div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 ">
		        			{this.props.profile[0].address}
		        		</div>

		        	</div>
		        	<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 RowDiv"> 
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4  RowData">
		        			City
		        		</div>
		        		<div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 ">
		        			{this.props.profile[0].city}
		        		</div>

		        	</div>
		        	<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 RowDiv"> 
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4  RowData">
		        			State
		        		</div>
		        		<div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 ">
		        			{this.props.profile[0].state}
		        		</div>

		        	</div>
		        	<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 RowDiv"> 
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4  RowData">
		        			Zip Code
		        		</div>
		        		<div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 ">
		        			{this.props.profile[0].zip_code}
		        		</div>

		        	</div>
		        	<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 RowDiv"> 
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4 RowData ">
		        			Phone
		        		</div>
		        		<div className="col-md-8 col-sm-8 col-lg-8 col-xs-8 ">
		        			{this.props.profile[0].phone_number}
		        		</div>

		        	</div>

	  			</div>
	        );
	    }    
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getUserDetails : () => dispatch(getUserDetails()),

    };
}

function mapStateToProps(state) {
    return {
        profile : state.profileReducer.profile
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <ProfileInfo {...props}/>));
