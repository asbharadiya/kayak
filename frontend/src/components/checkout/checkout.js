import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './checkout.css';
import CarCheckOutDetails from './carCheckOutDetails/carCheckoutDetails'
import CarCheckoutBookingInfo from './carCheckoutBookingInfo/carCheckoutBookingInfo'
import CarCheckoutSummary from './carCheckoutSummary/carCheckoutSummary'

class Checkout extends Component {

    constructor(props){
        super(props) ;

        this.state = {
            category :  this.props.match.params.category  , 
            id :  this.props.match.params.id  , 
        }
    }

    render() {
        

        return (

             <div className="checkout-page-wrapper">
                 <div className="page-container">
                        <div className="steps-container">

                  {
                    this.state.category === 'cars' ? 
                    
                     <div>
                        <CarCheckOutDetails />
                       
                       <CarCheckoutBookingInfo />
                       
                        
                    </div> 
                    : 
                    
                            
                        <div>

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

                        </div>
                }


                         <div className="checkout-panel">
                                <div className="checkout-panel-title">
                                    <p>Payment</p>
                                </div>
                                <div className="checkout-panel-body">
                                    Payment form
                                </div>
                            </div>
                        </div>
                       

                        {
                            this.state.category === 'cars' ? 
                                <CarCheckoutSummary />
                            :

                            <div className="summary-container checkout-panel">
                                <div className="checkout-panel-title">
                                    <p>Summary</p>
                                </div>
                                <div className="checkout-panel-body">

                                </div>
                            </div>
                        }

                        


                 </div>
            </div>

           
            
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(mapStateToProps)(props => <Checkout {...props}/>));