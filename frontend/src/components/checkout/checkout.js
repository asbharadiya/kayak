import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './checkout.css';
import CarCheckoutDetails from './carCheckoutDetails/carCheckoutDetails';
import CarCheckoutBookingInfo from './carCheckoutBookingInfo/carCheckoutBookingInfo';
import CarCheckoutSummary from './carCheckoutSummary/carCheckoutSummary';
import FlightCheckoutDetails from './flightCheckoutDetails/flightCheckoutDetails';
import FlightCheckoutBookingInfo from './flightCheckoutBookingInfo/flightCheckoutBookingInfo';
import FlightCheckoutSummary from './flightCheckoutSummary/flightCheckoutSummary';

class Checkout extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            category :  this.props.match.params.category,
            id :  this.props.match.params.id,
        }
    }


    componentDidMount(){

    }

    render() {
        return (
            <div className="checkout-page-wrapper">
                <div className="page-container">
                    <div className="steps-container">
                        <div className="checkout-panel">
                            <div className="checkout-panel-title">
                                <p>Details</p>
                            </div>
                            <div className="checkout-panel-body">
                                {
                                    this.state.category === 'cars' ? (
                                        <CarCheckoutDetails />
                                    ) : this.state.category === 'flights' ? (
                                        <FlightCheckoutDetails />
                                    ) : (
                                        <CarCheckoutDetails />
                                    )
                                }
                            </div>
                        </div>
                        <div className="checkout-panel">
                            <div className="checkout-panel-title">
                                <p>Booking Information</p>
                            </div>
                            <div className="checkout-panel-body">
                                {
                                    this.state.category === 'cars' ? (
                                        <CarCheckoutBookingInfo />
                                    ) : this.state.category === 'flights' ? (
                                        <FlightCheckoutBookingInfo />
                                    ) : (
                                        <CarCheckoutBookingInfo />
                                    )
                                }
                            </div>
                        </div>
                        <div className="checkout-panel">
                            <div className="checkout-panel-title">
                                <p>Payment</p>
                            </div>
                            <div className="checkout-panel-body">
                                Payment form
                            </div>
                        </div>
                    </div>
                    <div className="summary-container checkout-panel">
                        <div className="checkout-panel-title">
                            <p>Summary</p>
                        </div>
                        <div className="checkout-panel-body">
                            {
                                this.state.category === 'cars' ? (
                                    <CarCheckoutSummary />
                                ) : this.state.category === 'flights' ? (
                                    <FlightCheckoutSummary />
                                ) : (
                                    <CarCheckoutSummary />
                                )
                            }
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

export default withRouter(connect(mapStateToProps)(props => <Checkout {...props}/>));