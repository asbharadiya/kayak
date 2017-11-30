import React, { Component } from 'react';
import './profileInfo.css';
import Sidebar from './../sidebar/sidebar';
import {getUserDetails, updateUserProfile } from '../../actions/profile'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class ProfileInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            _id : '',
            auth_user_id:'',
            filename : '' , 
            profileFile : ''
        }

        this.updateProfile = this.updateProfile.bind(this)
    }

    componentDidMount(){

        this.props.getUserDetails();
        console.log('MOUNT')
        
    }


   
   componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!')
      if(this.state._id==='')
      {	
      	this.setState({
              		_id : this.props.profile[0]._id,
              		auth_user_id: this.props.profile[0].auth_user_id
            })
      	
	  }
	  console.log(this.props.userUpdateSuccess)
	  if(this.props.userUpdateSuccess===true)
	  {
	  	this.props.getUserDetails();
	  }

   }
   componentWillUnmount() {
      console.log('Component WILL UNMOUNT!')

   }

    updateProfile() {
    	//var _id= this.props.profile[0]._id;
    	console.log('Update')
    	console.log(document.getElementById('email').value)
    	var obj = {
    		_id  : this.state._id,
    		auth_user_id : this.state.auth_user_id,
    		firstName : document.getElementById('firstName').value,
    		lastName : document.getElementById('lastName').value,
    		address : document.getElementById('address').value,
    		city : document.getElementById('city').value,
    		state : document.getElementById('state').value,
    		zip_code : document.getElementById('zip_code').value,
    		phone_number : document.getElementById('phone_number').value,
    		email : document.getElementById('email').value,
    	}
    	console.log(obj)
    	this.props.updateUserProfile(obj)
    }

    render() {
    	console.log('State')
    	console.log(this.props.profile[0])
    	if(this.props.profile[0]===undefined)
    	{	
	        return (
			  	<div className="profile-page-wrapper">
		        	<div className="row profile-page-header ">
		        		<h2>Loading ...</h2>
		        	</div>
		        	

	  			</div>
	        );
	    }
	    else{

	    	

	    	return (
			  	<div className="profile-page-wrapper">
		        	<div className="row profile-page-header">
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4 outline">
		        			<h2>Profile</h2>
		        		</div>
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4 outline">
		        			<img className="profileImage img-circle" src="/assets/images/profile.png" 
                                 alt=""/>
		        		</div>
		        		<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4 outline">
		        			<button type="button" className="btn btn-default  btn-kayak pull-right edit-button" data-toggle="modal" data-target="#editProfile">Edit</button>
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



		        	<div className="modal fade" id="editProfile" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="profile-modal-content">
                                <div className="profile-modal-header">
                                    <h3 className="modal-title" id="exampleModalLabel">Edit Profile</h3>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                     	<span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="profile-modal-body">
                                    <div className="row ModalRow">
	                                    <label className="col-sm-3 ">First Name :</label>
	                                    <div className="col-sm-8 ">
	                                    	<input type="text" className="form-control" name="firstName" id="firstName" defaultValue={this.props.profile[0].firstName}></input>
	                                    </div>
                                    </div>
                                    <div className="row ModalRow">
	                                    <label className="col-sm-3 ">Last Name :</label>
	                                    <div className="col-sm-8 ">
	                                    	<input type="text" className="form-control" name="lastName" id="lastName" defaultValue={this.props.profile[0].lastName}></input>
	                                    </div>
                                    </div>
                                    <div className="row ModalRow">
	                                    <label className="col-sm-3 ">Email :</label>
	                                    <div className="col-sm-8 ">
	                                    	<input type="email" className="form-control" name="email" id="email" defaultValue={this.props.profile[0].email} disabled></input>
	                                    </div>
                                    </div>
                                    <div className="row ModalRow">
	                                    <label className="col-sm-3 ">Address :</label>
	                                    <div className="col-sm-8 ">
	                                    	<input type="email" className="form-control" name="address" id="address" defaultValue={this.props.profile[0].address}></input>
	                                    </div>
                                    </div>
                                    <div className="row ModalRow">
	                                    <label className="col-sm-3 ">City :</label>
	                                    <div className="col-sm-8 ">
	                                    	<input type="text" className="form-control" name="city" id="city" defaultValue={this.props.profile[0].city}></input>
	                                    </div>
                                    </div>
                                    <div className="row ModalRow">
	                                    <label className="col-sm-3 ">State :</label>
	                                    <div className="col-sm-8 ">
	                                    	<input type="text" className="form-control" name="state" id="state" defaultValue={this.props.profile[0].state}></input>
	                                    </div>
                                    </div>
                                    <div className="row ModalRow">
	                                    <label className="col-sm-3 ">Zip Code :</label>
	                                    <div className="col-sm-8 ">
	                                    	<input type="number" className="form-control" name="zip_code" id="zip_code" defaultValue={this.props.profile[0].zip_code}></input>
	                                    </div>
                                    </div>
                                    <div className="row ModalRow ">
	                                    <label className="col-sm-3 ">Phone :</label>
	                                    <div className="col-sm-8 ">
	                                    	<input type="number" className="form-control" name="phone_number" id="phone_number" defaultValue={this.props.profile[0].phone_number}></input>
	                                    </div>
                                    </div>

                                    <div className="form-group ModalRow  row">
		                            <label htmlFor="profile" className="col-sm-3 ">Profile Image :</label>
		                           
			                             <div className="input-group image-preview col-sm-8">
			                              <input type="text" value={this.state.filename} className="form-control image-preview-filename" disabled="disabled" />
			                                   <span className="input-group-btn">

			                                    {
			                                                 this.state.carFile === '' ?
			                                                     <span></span>
			                                                     :
			                                                     <button type="button"  onClick={() => {
			                                                         this.setState({profileFile : '' , filename : ''})
			                                                     }} className="btn btn-default image-preview-clear" >
			                                                         <span className="glyphicon glyphicon-remove"></span> Clear
			                                                     </button>
			                                             }
			 
			 
			 
			                                     <div className="btn btn-default image-preview-input">
			                                                 <span className="glyphicon glyphicon-folder-open"></span>
			                                                 <span className="image-preview-input-title"></span> Browse
			                                                 <input type="file" onChange={(e) => {
			                                                     var file = e.target.files[0];
			 
			 
			                                                     if(file === undefined){
			                                                         return ;
			                                                     }
			 
			                                                     this.setState({ profileFile : file , filename : file.name})
			 
			                                                 }} accept="image/png, image/jpeg, image/gif" name="input-file-preview"/>
			                                             </div>
			 
			                                         </span>
			 
			                            	</div>

		                            
		                        	</div>


                                </div>
                                <div className="profile-modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.updateProfile}>Update</button>
                                </div>
                            </div>
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
        updateUserProfile : (obj) => dispatch(updateUserProfile(obj)),

    };
}

function mapStateToProps(state) {
    return {
        profile : state.profileReducer.profile,
        userUpdateSuccess : state.profileReducer.userUpdateSuccess
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <ProfileInfo {...props}/>));
