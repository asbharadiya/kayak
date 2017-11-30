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
            <div className="row car-panel-body-content">

                <div className="content-name">
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 checkout-panel-body-content-head">
                        <span className="carName"> {this.props.details.carName} or Similar </span>
                        <span className="carProperty"> | {this.props.details.carType} | {this.props.details.occupancy} Seats | Luggage {this.props.details.luggage} </span>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 checkout-panel-body-content-city">
                        <span className="city">{this.props.queryParams.city}</span>
                    </div>
                </div>




                <div className="content-name">
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 checkout-panel-body-content-data">
                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                            <div className="from-date">
                                {this.props.queryParams.startDate}
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
                                {this.props.queryParams.endDate}
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 checkout-panel-body-content-image">
                        <img className="carImage" src="/assets/images/hyundai.png"
                             alt="Vehicle type: Economy - Hyundai Accent or similar"/>
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