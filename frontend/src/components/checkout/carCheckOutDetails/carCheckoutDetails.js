import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './carCheckoutDetails.css';

class CarCheckoutDetails extends Component {

    constructor(props){
        super(props) ;

        this.state = {
           
        }
    }

    render() {
        

        return (

            
            
            
                    
                        <div className="checkout-panel">
                            <div className="checkout-panel-title">
                                <p>Details</p>
                            </div>
                            <div className="checkout-panel-body">

                                

                                <div className="row checkout-panel-body-content">
                                    
                                    <div>
                                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 checkout-panel-body-content-head">
                                            <span className="carName"> Hyundai or Similar </span> 
                                             <span className="carProperty"> | Premium | 4 Seats | Luggage YES </span>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 checkout-panel-body-content-city">
                                            <span className="city">San Jose</span>
                                        </div>
                                    </div>




                                    <div>
                                         <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 checkout-panel-body-content-data">
                                            <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                                <div className="from-date">
                                                    26 Nov 2017
                                                </div>
                                            </div>
                                            <div className="map-content col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                                <p><span className="blue-dot "></span>
                                                    <span className="line-map "></span>
                                                    <span className="green-dot "></span>
                                                </p>
                                            </div>
                                            <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                                <div className="from-date">
                                                    27 Nov 2017
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 checkout-panel-body-content-image">
                                            <img className="carImage" src="/assets/images/hyundai.png"
                                            alt="Vehicle type: Economy - Hyundai Accent or similar"/>
                                        </div>
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

export default withRouter(connect(mapStateToProps)(props => <CarCheckoutDetails {...props}/>));