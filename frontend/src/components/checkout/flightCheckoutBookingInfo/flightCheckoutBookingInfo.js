import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './flightCheckoutBookingInfo.css';

class FlightCheckoutBookingInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            emailAddress:'',
            phoneNumber:'',
            travelerInfo:Array.from({length: this.props.queryParams.travelers}, (v, i) => {
                return {
                    firstName:'',
                    middleName:'',
                    lastName:''
                }
            })
        }
    }

    getPhoneNumber(e){
        this.setState({
            phoneNumber:e.target.value
        }, function(){
            this.props.updateBookingInfo(this.state);
        })
    }

    getEmailAddress(e){
        this.setState({
            emailAddress:e.target.value
        }, function(){
            this.props.updateBookingInfo(this.state);
        })
    }

    getFirstName(key,e){
        const items = this.state.travelerInfo;
        items[key].firstName = e.target.value;
        this.forceUpdate();
        this.props.updateBookingInfo(this.state);
    }

    getMiddleName(key,e){
        const items = this.state.travelerInfo;
        items[key].middleName = e.target.value;
        this.forceUpdate();
        this.props.updateBookingInfo(this.state);
    }

    getLastName(key,e){
        const items = this.state.travelerInfo;
        items[key].lastName = e.target.value;
        this.forceUpdate();
        this.props.updateBookingInfo(this.state);
    }

    render() {
        return (
            <div className="flight-checkout-booking">
                <div className="travelers-info">
                    {
                        this.state.travelerInfo.map((traveler , key) => {
                            return <div className="form-group" key={key}>
                                <div className="col-xs-12">
                                    <p>Traveler #{key+1}</p>
                                </div>
                                <div className="col-xs-4">
                                    <input type="text" className="form-control" placeholder="First name/Given name" onChange={this.getFirstName.bind(this,key)}/>
                                </div>
                                <div className="col-xs-4">
                                    <input type="text" className="form-control" placeholder="Middle name" onChange={this.getMiddleName.bind(this,key)}/>
                                </div>
                                <div className="col-xs-4">
                                    <input type="text" className="form-control" placeholder="Last name/Family name" onChange={this.getLastName.bind(this,key)}/>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        })
                    }
                </div>
                <div className="contact-info">
                    <div className="form-group row">
                        <div className="col-xs-12">
                            <input type="text" className="form-control" placeholder="Email address" onChange={this.getPhoneNumber.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-xs-12">
                            <input type="text" className="form-control" placeholder="Phone number" onChange={this.getEmailAddress.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(mapStateToProps)(props => <FlightCheckoutBookingInfo {...props}/>));