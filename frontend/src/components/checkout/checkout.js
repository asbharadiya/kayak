import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import queryString from 'query-string';
import './checkout.css';
import CarCheckoutDetails from './carCheckOutDetails/carCheckoutDetails';
import CarCheckoutBookingInfo from './carCheckoutBookingInfo/carCheckoutBookingInfo';
import CarCheckoutSummary from './carCheckoutSummary/carCheckoutSummary';
import FlightCheckoutDetails from './flightCheckoutDetails/flightCheckoutDetails';
import FlightCheckoutBookingInfo from './flightCheckoutBookingInfo/flightCheckoutBookingInfo';
import FlightCheckoutSummary from './flightCheckoutSummary/flightCheckoutSummary';
import * as carApis from '../../api/car';
import * as flightApis from '../../api/flight';
import * as hotelApis from '../../api/hotel';
import * as profileApis from '../../api/profile';

class Checkout extends Component {

    constructor(props){
        super(props) ;
        //TODO: restrict direct access to this page
        this.state = {
            category: this.props.match.params.category,
            queryParams: queryString.parse(this.props.location.search),
            id: this.props.match.params.id,
            listingDetails: null,
            total: 0,
            paymentMethod: 'existing',
            creditCards: [],
            selectedCreditCard: null,
            cardNumber: '',
            nameOnCard: '',
            expiryDate: '',
            cvv: '',
            saveCard:false,
            bookingInfo: null
        }
        this.updateTotal = this.updateTotal.bind(this);
        this.updateBookingInfo = this.updateBookingInfo.bind(this);
        this.onPaymentMethodChanged = this.onPaymentMethodChanged.bind(this);
        this.onCreditCardSelected = this.onCreditCardSelected.bind(this);
        this.completeBooking = this.completeBooking.bind(this);
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
        profileApis.getCreditCards(function(error, response){
            if(error){

            } else {
                response.then((res) => {
                    if(res.status === 200){
                        _this.setState({
                            creditCards:res.data
                        })
                    }else{

                    }
                })
            }
        })
    }

    updateBookingInfo(info){
        this.setState({
            bookingInfo:info
        })
    }

    updateTotal(total){
        this.setState({
            total:total
        })
    }

    onPaymentMethodChanged(method){
        this.setState({
            paymentMethod: method,
            cardNumber:'',
            nameOnCard:'',
            expiryDate:'',
            cvv:'',
            saveCard:false,
            selectedCreditCard:null
        })
    }

    onCreditCardSelected(id){
        this.setState({
            selectedCreditCard:id
        })
    }

    getCardNumber(e){
        this.setState({
            cardNumber : e.target.value
        })
    }

    getNameOnCard(e){
        this.setState({
            nameOnCard : e.target.value
        })
    }

    getExpiryDate(e){
        this.setState({
            expiryDate : e.target.value
        })
    }

    getCvv(e){
        this.setState({
            cvv : e.target.value
        })
    }

    completeBooking(){
        if(this.state.bookingInfo === null){
            alert('Please fill out all the required booking information!');
            return;
        }
        if(this.state.category === 'flights'){
            if(this.state.bookingInfo.emailAddress === '' || this.state.bookingInfo.phoneNumber === '') {
                alert('Please fill out all the required booking information!');
                return;
            }
            this.state.bookingInfo.travelerInfo.map((traveler , key) => {
                if(traveler.firstName === '' || traveler.lastName === ''){
                    alert('Please fill out all the required booking information!');
                    return;
                }
            })
        } else if(this.state.category === 'cars') {
            //TODO: validate car booking info
        } else {
            //TODO: validate hotel booking info
        }
        if(this.state.paymentMethod === 'existing'){
            if(this.state.selectedCreditCard === null) {
                alert('Please select valid payment method!');
                return;
            }
        } else {
            if(this.state.cardNumber === '' || this.state.nameOnCard === '' || this.state.expiryDate === '' || this.state.cvv === ''){
                alert('Please fill out the payment information!');
                return;
            }
        }
        //TODO: make booking...
        //send listing id, new credit card info or credit card id for payment, booking information to backend
        //should get all above data at this point in all three cases
        //make entry to booking table
        //make entry to billing table
        //add new credit card if save checkbox is checked
        //subtract available from the listing object
        console.log('Processing....');
    }

    //TODO: implement hotel components
    //TODO: finish cars components
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
                                        <CarCheckoutBookingInfo queryParams={this.state.queryParams}/>
                                    ) : this.state.category === 'flights' ? (
                                        <FlightCheckoutBookingInfo queryParams={this.state.queryParams} updateBookingInfo={this.updateBookingInfo}/>
                                    ) : (
                                        <CarCheckoutBookingInfo queryParams={this.state.queryParams}/>
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
                                    <label><input type="radio" name="paymentmethod"
                                                  value="existing" checked={this.state.paymentMethod === 'existing'}
                                                  onChange={(method)=>this.onPaymentMethodChanged('existing')}/>Select a payment method</label>
                                </div>
                                <div className={"credit-card-list "+(this.state.paymentMethod !== "existing" ? "disabled":"")}>
                                    {
                                        this.state.creditCards.length > 0 ? (
                                            this.state.creditCards.map((creditCard , key) => {
                                                <div className="radio" key={key}>
                                                    <label><input type="radio" name="creditcard" value={creditCard.id}
                                                                  checked={this.state.selectedCreditCard === creditCard.id}
                                                                  onChange={(id)=>this.onCreditCardSelected(creditCard.id)}/>{creditCard.cardNumber}</label>
                                                </div>
                                            })
                                        ) : (
                                            <p>No saved payment methods</p>
                                        )
                                    }
                                    <div className="cover"></div>
                                </div>
                                <div className="radio payment-method">
                                    <label><input type="radio" name="paymentmethod"
                                                  value="new" checked={this.state.paymentMethod === 'new'}
                                                  onChange={(method)=>this.onPaymentMethodChanged('new')}/>Or use a new one</label>
                                </div>
                                <div className={"credit-card-form "+(this.state.paymentMethod !== "new" ? "disabled":"")}>
                                    <div className="form-group row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" placeholder="Card number (XXXX XXXX XXXX XXXX)"
                                                   onChange={this.getCardNumber.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-xs-12">
                                            <input type="text" className="form-control" placeholder="Name on card"
                                                   onChange={this.getNameOnCard.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-xs-6">
                                            <input type="text" className="form-control" placeholder="Expiry date (MM/YY)"
                                                   onChange={this.getExpiryDate.bind(this)}/>
                                        </div>
                                        <div className="col-xs-6">
                                            <input type="text" className="form-control" placeholder="CVV"
                                                   onChange={this.getCvv.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12 checkbox">
                                            <label><input type="checkbox" checked={this.state.saveCard}
                                                          onChange={()=>this.setState({saveCard:!this.state.saveCard})}/>save this method for future use</label>
                                        </div>
                                    </div>
                                    <div className="cover"></div>
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
                                    this.state.listingDetails !== null ? (
                                        this.state.category === 'cars' ? (
                                            <CarCheckoutSummary details={this.state.listingDetails}
                                                                queryParams={this.state.queryParams}
                                                                updateTotal={this.updateTotal}/>
                                        ) : this.state.category === 'flights' ? (
                                            <FlightCheckoutSummary details={this.state.listingDetails}
                                                                   queryParams={this.state.queryParams}
                                                                   updateTotal={this.updateTotal}/>
                                        ) : (
                                            <CarCheckoutSummary details={this.state.listingDetails}
                                                                queryParams={this.state.queryParams}
                                                                updateTotal={this.updateTotal}/>
                                        )
                                    ) : (
                                        <div className="text-center">Loading...</div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="checkout-btn-container">
                            <button className="btn btn-primary btn-kayak" onClick={this.completeBooking}>Pay now</button>
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