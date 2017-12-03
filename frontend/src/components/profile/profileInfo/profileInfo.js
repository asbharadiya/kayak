import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import {getUserDetails, updateUserProfile } from '../../../actions/profile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as analytics from '../../../actions/analytics';
import './profileInfo.css';

class ProfileInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            _id : '',
            auth_user_id:'',
            filename : '' ,
            profileFile : '',
            showProfileEditModal : false ,
        }
        this.updateProfile = this.updateProfile.bind(this)
        this.openEditProfile = this.openEditProfile.bind(this);
        this.closeEditProfile = this.closeEditProfile.bind(this);
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

    openEditProfile(){
        this.trackClick('edit-profile', '/profile');
        this.setState({
            showProfileEditModal : true
        })
    }

    closeEditProfile(){
        this.trackClick('close-edit-profile', '/profile');
        this.setState({
            showProfileEditModal : false
        })
    }

    trackClick(click, page) {
      var payload = {'click' : click, 'page' : page};
      this.props.trackClick(payload);
    }

    updateProfile() {
        //var _id= this.props.profile[0]._id;
        this.trackClick('update-profile', '/profile');
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
        this.props.updateUserProfile(obj, this.state.profileFile)
        this.closeEditProfile()
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
                <div className="profile-panel personal-details">
                    <div className="profile-panel-body">
                        <div className="row">
                            <div className="col-xs-3">
                                <div className="profile-img">
                                    <img className="img-circle img-responsive" src="/assets/images/profile.png"
                                         alt=""/>
                                </div>
                                <div className="btn-container">
                                    <button type="button" className="btn btn-primary btn-kayak"
                                            onClick={this.openEditProfile}>Edit profile
                                    </button>
                                </div>
                            </div>
                            <div className="col-xs-9">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <label className="label-text">First name</label>
                                        <p className="value">{this.props.profile[0].firstName}</p>
                                    </div>
                                    <div className="col-xs-6">
                                        <label className="label-text">Last name</label>
                                        <p className="value">{this.props.profile[0].lastName}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <label className="label-text">Email</label>
                                        <p className="value">{this.props.profile[0].email}</p>
                                    </div>
                                    <div className="col-xs-6">
                                        <label className="label-text">Phone number</label>
                                        <p className="value">{this.props.profile[0].phone_number}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <label className="label-text">Street address</label>
                                        <p className="value">{this.props.profile[0].address}</p>
                                    </div>
                                    <div className="col-xs-6">
                                        <label className="label-text">City</label>
                                        <p className="value">{this.props.profile[0].city}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <label className="label-text">State</label>
                                        <p className="value">{this.props.profile[0].state}</p>
                                    </div>
                                    <div className="col-xs-6">
                                        <label className="label-text">Zip code</label>
                                        <p className="value">{this.props.profile[0].zip_code}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal show={this.state.showProfileEditModal} className="modal fade" id="editProfile" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                         <div className="modal-dialog" role="document">
                            <div className="profile-modal-content">

                                <Modal.Header className="profile-modal-header">
                                    <h3 className="modal-title" id="exampleModalLabel">Edit Profile</h3>

                                </Modal.Header>

                                <Modal.Body className="profile-modal-body">
                                    <div className="row ModalRow">
                                        <label className="col-sm-3 ">First Name :</label>
                                        <div className="col-sm-8 ">
                                            <input type="text" className="form-control" name="firstName" id="firstName"
                                                   defaultValue={this.props.profile[0].firstName}></input>
                                        </div>
                                    </div>
                                    <div className="row ModalRow">
                                        <label className="col-sm-3 ">Last Name :</label>
                                        <div className="col-sm-8 ">
                                            <input type="text" className="form-control" name="lastName" id="lastName"
                                                   defaultValue={this.props.profile[0].lastName}></input>
                                        </div>
                                    </div>
                                    <div className="row ModalRow">
                                        <label className="col-sm-3 ">Email :</label>
                                        <div className="col-sm-8 ">
                                            <input type="email" className="form-control" name="email" id="email"
                                                   defaultValue={this.props.profile[0].email} disabled></input>
                                        </div>
                                    </div>
                                    <div className="row ModalRow">
                                        <label className="col-sm-3 ">Address :</label>
                                        <div className="col-sm-8 ">
                                            <input type="email" className="form-control" name="address" id="address"
                                                   defaultValue={this.props.profile[0].address}></input>
                                        </div>
                                    </div>
                                    <div className="row ModalRow">
                                        <label className="col-sm-3 ">City :</label>
                                        <div className="col-sm-8 ">
                                            <input type="text" className="form-control" name="city" id="city"
                                                   defaultValue={this.props.profile[0].city}></input>
                                        </div>
                                    </div>
                                    <div className="row ModalRow">
                                        <label className="col-sm-3 ">State :</label>
                                        <div className="col-sm-8 ">
                                            <input type="text" className="form-control" name="state" id="state"
                                                   defaultValue={this.props.profile[0].state}></input>
                                        </div>
                                    </div>
                                    <div className="row ModalRow">
                                        <label className="col-sm-3 ">Zip Code :</label>
                                        <div className="col-sm-8 ">
                                            <input type="number" className="form-control" name="zip_code" id="zip_code"
                                                   defaultValue={this.props.profile[0].zip_code}></input>
                                        </div>
                                    </div>
                                    <div className="row ModalRow ">
                                        <label className="col-sm-3 ">Phone :</label>
                                        <div className="col-sm-8 ">
                                            <input type="number" className="form-control" name="phone_number"
                                                   id="phone_number"
                                                   defaultValue={this.props.profile[0].phone_number}></input>
                                        </div>
                                    </div>

                                    <div className="form-group ModalRow  row">
                                        <label htmlFor="profile" className="col-sm-3 ">Profile Image :</label>

                                        <div className="input-group image-preview col-sm-8">
                                            <input type="text" value={this.state.filename}
                                                   className="form-control image-preview-filename" disabled="disabled"/>
                                            <span className="input-group-btn">

                                                    {
                                                        this.state.profileFile === '' ?
                                                            <span></span>
                                                            :
                                                            <button type="button" onClick={() => {
                                                                this.setState({profileFile: '', filename: ''})
                                                            }} className="btn btn-default image-preview-clear">
                                                                <span className="glyphicon glyphicon-remove"></span> Clear
                                                            </button>
                                                    }


                                                <div className="btn btn-default image-preview-input">
                                                                 <span className="glyphicon glyphicon-folder-open"></span>
                                                                 <span className="image-preview-input-title"></span> Browse
                                                                 <input type="file" onChange={(e) => {
                                                                     var file = e.target.files[0];


                                                                     if (file === undefined) {
                                                                         return;
                                                                     }

                                                                     this.setState({profileFile: file, filename: file.name})

                                                                 }} accept="image/png, image/jpeg, image/gif"
                                                                        name="input-file-preview"/>
                                                             </div>

                                                         </span>

                                        </div>


                                    </div>


                                </Modal.Body>

                                <Modal.Footer className="profile-modal-footer">
                                    <button type="button" className="btn btn-default btn-kayak btn-kayak-default" onClick={this.closeEditProfile}>Close</button>
                                    <button type="button" className="btn btn-primary btn-kayak" onClick={this.updateProfile} >Update</button>
                                </Modal.Footer>

                            </div>
                        </div>
                    </Modal>




                </div>
            );
        }
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getUserDetails : () => dispatch(getUserDetails()),
        updateUserProfile : (obj, file) => dispatch(updateUserProfile(obj, file)),
        trackClick : (payload) => dispatch(analytics.trackClick(payload))
    };
}

function mapStateToProps(state) {
    return {
        profile : state.profileReducer.profile,
        userUpdateSuccess : state.profileReducer.userUpdateSuccess
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <ProfileInfo {...props}/>));
