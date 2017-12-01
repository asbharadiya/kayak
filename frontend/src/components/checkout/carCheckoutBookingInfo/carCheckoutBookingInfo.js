import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './carCheckoutBookingInfo.css';

class CarCheckoutBookingInfo extends Component {

    constructor(props){
        super(props) ;

        this.state = {
            firstName : '' ,
            lastName : '' ,
            phoneNumber : '' ,
            email : '' ,
            licenseNumber : ''
        }
    }


    setFname = (e) => {
        this.setState({
            firstName : e.target.value
        })
    }

    setLname = (e) => {
        this.setState({
            lastName : e.target.value
        })
    }

    setPhone = (e) => {
        this.setState({
            phoneNumber : e.target.value
        })
    }

    setEmail = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    setLicense = (e) => {
        this.setState({
            licenseNumber : e.target.value
        })
    }


    componentWillReceiveProps(newProps){
        this.setState({
            firstName :  newProps.profile != undefined ? newProps.profile.firstName : '' ,
            lastName : newProps.profile != undefined ? newProps.profile.lastName : '' ,
            phoneNumber : newProps.profile != undefined ? (newProps.profile.phone_number != null ? newProps.profile.phone_number : ''  ) : '',
            email : newProps.profile != undefined ? newProps.profile.email : ''
        })
    }

    render() {

        
        return (
            <div className="row car-checkout-booking">

                <div className="body-single-data-content col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <input value={ this.state.firstName}  onChange={this.setFname} type="text" className="form-control booking-info-data-element" placeholder="First Name" />
                </div>


                <div className="body-single-data-content col-lg-6 col-md-6 col-sm-6 col-xs-6">
                     <input value={this.state.lastName } onChange={this.setLname} type="text" className="form-control booking-info-data-element" placeholder="Last Name" />
                </div>


                <div className="body-single-data-content col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <input value={ this.state.phoneNumber} onChange={this.setPhone} type="text" className="form-control booking-info-data-element " placeholder="Mobile" />
                </div>



                <div className="body-single-data-content col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <input  value={ this.state.email} onChange={this.setEmail} type="text" className="form-control booking-info-data-element" placeholder="Email" />
                </div>

                <div className="body-single-data-content col-lg-6 col-md-6 col-sm-6 col-xs-6">
                     <input type="text" onChange={this.setLicense} className="form-control booking-info-data-element" placeholder="License" />
                </div>



            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(mapStateToProps)(props => <CarCheckoutBookingInfo {...props}/>));