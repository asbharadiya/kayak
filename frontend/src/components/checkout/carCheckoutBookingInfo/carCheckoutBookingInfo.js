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
            phoneNumber : 0 ,
            email : '' ,
            licenseNumber : '',
            city : '',
            startDate : '' ,
            endDate : ''
        }

        this.setFname = this.setFname.bind(this);
        this.setLname = this.setLname.bind(this);
        this.setPhone = this.setPhone.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setLicense = this.setLicense.bind(this);
    }


    setFname = (e) => {
        this.setState({
            firstName : e.target.value
        } , function(){
            this.props.updateBookingInfo(this.state);
        })
    }

    setLname = (e) => {
        this.setState({
            lastName : e.target.value
        }, function(){
            this.props.updateBookingInfo(this.state);
        })
    }

    setPhone = (e) => {
        this.setState({
            phoneNumber : e.target.value
        }, function(){
           this.props.updateBookingInfo(this.state);
        })
    }

    setEmail = (e) => {
        this.setState({
            email : e.target.value
        }, function(){
            this.props.updateBookingInfo(this.state);
        })
    }

    setLicense = (e) => {
        this.setState({
            licenseNumber : e.target.value
        }, function(){
            this.props.updateBookingInfo(this.state);
        })
    }


    componentWillReceiveProps(newProps){
        console.log("query params "  , this.props.queryParams) ;
        this.setState({
            firstName :  newProps.profile != undefined ? newProps.profile.firstName : '' ,
            lastName : newProps.profile != undefined ? newProps.profile.lastName : '' ,
            phoneNumber : newProps.profile != undefined ? (newProps.profile.phone_number != null ? newProps.profile.phone_number : ''  ) : '',
            email : newProps.profile != undefined ? newProps.profile.email : '' ,
            city : this.props.queryParams.city ,
            startDate : this.props.queryParams.startDate ,
            endDate : this.props.queryParams.endDate
        } , function(){
            this.props.updateBookingInfo(this.state)
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
                    <input value={ this.state.phoneNumber} onChange={this.setPhone} type="number" className="form-control booking-info-data-element " placeholder="Mobile" />
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