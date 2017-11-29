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


    getFname = (e) => {
        this.setState({
            firstName : e.target.value
        })
    }

    getLname = (e) => {
        this.setState({
            lastName : e.target.value
        })
    }

    getPhone = (e) => {
        this.setState({
            phoneNumber : e.target.value
        })
    }

    getEmail = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    getLicense = (e) => {
        this.setState({
            licenseNumber : e.target.value
        })
    }

    render() {
        return (
            <div className="row car-panel-body-content">

                <div className="body-single-data-content col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className=" body-single-data-content-glyph col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <a><i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 data-div">
                        <p>FIRST NAME</p>
                        <input type="text" onChange={this.getFname.bind(this)} className="input-field"/>
                    </div>
                </div>


                <div className="body-single-data-content col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="body-single-data-content-glyph col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <a><i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 data-div">
                        <p>LAST NAME</p>
                        <input type="text" onChange={this.getLname.bind(this)}  className="input-field"/>
                    </div>
                </div>


                <div className="body-single-data-content col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="body-single-data-content-glyph col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <a><i className="fa fa-mobile fa-lg" aria-hidden="true"></i></a>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 data-div">
                        <p>PHONE NUMBER</p>
                        <input type="text" onChange={this.getPhone.bind(this)}  className="input-field"/>
                    </div>
                </div>



                <div className="body-single-data-content col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="body-single-data-content-glyph col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <a ><i className="fa fa-envelope-o" aria-hidden="true"></i></a>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 data-div">
                        <p>EMAIL</p>
                        <input type="text" onChange={this.getEmail.bind(this)}  className="input-field"/>
                    </div>
                </div>

                <div className="body-single-data-content col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="body-single-data-content-glyph col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <a ><i className="fa fa-id-card" aria-hidden="true"></i></a>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 data-div">
                        <p>LICENSE #</p>
                        <input type="text" onChange={this.getLicense.bind(this)}  className="input-field"/>
                    </div>
                </div>



            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(mapStateToProps)(props => <CarCheckoutBookingInfo {...props}/>));