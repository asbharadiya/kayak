import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import queryString from 'query-string';
import './checkout.css';
import CarCheckoutDetails from './carCheckoutDetails/carCheckoutDetails';
import CarCheckoutBookingInfo from './carCheckoutBookingInfo/carCheckoutBookingInfo';
import CarCheckoutSummary from './carCheckoutSummary/carCheckoutSummary';
import FlightCheckoutDetails from './flightCheckoutDetails/flightCheckoutDetails';
import FlightCheckoutBookingInfo from './flightCheckoutBookingInfo/flightCheckoutBookingInfo';
import FlightCheckoutSummary from './flightCheckoutSummary/flightCheckoutSummary';
import * as carApis from '../../api/car';
import * as flightApis from '../../api/flight';
import * as hotelApis from '../../api/hotel';

class Checkout extends Component {

    constructor(props){
        super(props) ;
        //TODO: restrict direct access to this page
        this.state = {
            category :  this.props.match.params.category,
            queryParams : queryString.parse(this.props.location.search),
            id :  this.props.match.params.id,
            listingDetails : null
        }
    }

    componentDidMount(){
        var _this = this;
        if(this.state.category === 'cars') {
            carApis.getCarById(this.state.id, function(error, response){
                if(error){

                } else {
                    response.then((res) => {
                        if(res.status === 200){
                            _this.setState({
                                listingDetails:res.data[0]
                            })
                        }else{

                        }
                    })
                }
            })
        } else if(this.state.category === 'flights') {
            flightApis.getFlightById(this.state.id, function(error, response){
                if(error){

                } else {
                    response.then((res) => {
                        if(res.status === 200){
                            _this.setState({
                                listingDetails:res.data[0]
                            })
                        }else{

                        }
                    })
                }
            })
        } else {
            hotelApis.getHotelById(this.state.id, function(error, response){
                if(error){

                } else {
                    response.then((res) => {
                        if(res.status === 200){
                            _this.setState({
                                listingDetails:res.data[0]
                            })
                        }else{

                        }
                    })
                }
            })
        }
    }

    //TODO: implement flight components
    //TODO: implement hotel components
    //TODO: finish cars components
    //TODO: implement payments section
    //TODO: complete booking
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
                                    this.state.listingDetails !== null ? (
                                        this.state.category === 'cars' ? (
                                            <CarCheckoutDetails details={this.state.listingDetails} queryParams={this.state.queryParams}/>
                                        ) : this.state.category === 'flights' ? (
                                            <FlightCheckoutDetails details={this.state.listingDetails} queryParams={this.state.queryParams} />
                                        ) : (
                                            <CarCheckoutDetails details={this.state.listingDetails} queryParams={this.state.queryParams} />
                                        )
                                    ) : (
                                        <div className="text-center">Loading...</div>
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
                            <div className="checkout-panel-body payment-body">
                                <div className="radio payment-method">
                                    <label><input type="radio" name="paymentmethod"/>Select a payment method</label>
                                </div>
                                <div className="credit-card-list">
                                    <div className="radio">
                                        <label><input type="radio" name="creditcard"/>XXXX-XXXX-XXXX-4777</label>
                                    </div>
                                    <div className="radio">
                                        <label><input type="radio" name="creditcard"/>XXXX-XXXX-XXXX-4777</label>
                                    </div>
                                    <p>No saved payment methods</p>
                                </div>
                                <div className="radio payment-method">
                                    <label><input type="radio" name="paymentmethod"/>Or use a new one</label>
                                </div>
                                <div className="credit-card-form">
                                    <div className="form-group row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" placeholder="Card number (XXXX XXXX XXXX XXXX)" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" placeholder="Name on card" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-xs-6">
                                            <input type="text" className="form-control" placeholder="Expiry date (MM/YY)" />
                                        </div>
                                        <div className="col-xs-6">
                                            <input type="text" className="form-control" placeholder="CVV" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12 checkbox">
                                            <label><input type="checkbox"/>save this method for future use</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="summary-container">
                        <div className="checkout-panel">
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
                        <div className="checkout-btn-container">
                            <button className="btn btn-primary btn-kayak">Pay now</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <Checkout {...props}/>));