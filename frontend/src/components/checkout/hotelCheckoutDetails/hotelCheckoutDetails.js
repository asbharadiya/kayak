import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './hotelCheckoutDetails.css';

class HotelCheckoutDetails extends Component {

    constructor(props){
        super(props) ;
        this.state = {

        }
    }

    render() {
       return (
            <div className="row hotel-panel-body-content">
                <div className="content-name">
                    <div className="col-xs-12 checkout-panel-body-content-head">
                        <span className="hotelName"> {this.props.details.hotelName} </span>
                        <span className="hotelProperty"> {this.props.details.hotelCity}, {this.props.details.hotelState} - {this.props.details.hotelZip} </span>
                    </div>
                </div>
                <div className="content-name">
                    <div className="col-xs-2 checkout-panel-body-content-image">
                      <img className="hotelImage" src="/assets/images/hotel_placeholder.png"
                      alt="Vehicle type: Economy - Hyundai Accent or similar"/>
                    </div>
                    <div className="col-xs-10 checkout-panel-body-content-data">
                        <div className="col-xs-3">
                          <div className="check-in-container">
                            <div className="detail-label">
                              Check-In
                            </div>
                            <div className="contact-email">
                              { this.props.queryParams.checkInDate }
                            </div>
                          </div>
                          <div className="check-out-container">
                            <div className="detail-label">
                              Check-Out
                            </div>
                            <div className="contact-email">
                              { this.props.queryParams.checkOutDate }
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-3">
                            <div className="detail-label">
                              Contact
                            </div>
                            <div className="contact-email">
                                { this.props.details.hotelEmail }
                            </div>
                            <div className="contact-email">
                                { this.props.details.hotelPhoneNumber }
                            </div>
                        </div>
                        <div className="col-xs-4">
                            <div className="from-date">
                                {this.props.queryParams.endDate}
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

export default withRouter(connect(mapStateToProps)(props => <HotelCheckoutDetails {...props}/>));
