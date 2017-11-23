import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './checkout.css';

class Checkout extends Component {

    render() {
        const category = this.props.match.params.category;
        return (
            <div className="checkout-page-wrapper">
                <div className="page-container">
                    <div className="steps-container">
                        <div className="checkout-panel">
                            <div className="checkout-panel-title">
                                <p>Details</p>
                            </div>
                            <div className="checkout-panel-body">
                                Selected hotel/flight/car details
                            </div>
                        </div>
                        <div className="checkout-panel">
                            <div className="checkout-panel-title">
                                <p>Booking Information</p>
                            </div>
                            <div className="checkout-panel-body">
                                Booking form filled by user based on car/flight/hotel
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