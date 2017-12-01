import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './hotelCheckoutDetails.css';
import moment from 'moment';

class HotelCheckoutDetails extends Component {

    constructor(props){
        super(props) ;
        var checkInDate = moment(this.props.queryParams.checkInDate, 'MM-DD-YYYY');
        var checkOutDate = moment(this.props.queryParams.checkOutDate, 'MM-DD-YYYY');
        this.state = {
          totalDays: checkOutDate.diff(checkInDate,'days')+1
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
                            <div className="detail-data">
                              { this.props.queryParams.checkInDate }
                            </div>
                          </div>
                          <div className="check-out-container">
                            <div className="detail-label">
                              Check-Out
                            </div>
                            <div className="detail-data">
                              { this.props.queryParams.checkOutDate }
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-3">
                          <div className="room-type-container">
                            <div className="detail-label">
                              Room Type
                            </div>
                            <div className="detail-data">
                                { this.props.queryParams.roomType }
                            </div>
                          </div>
                          <div className="guests-container">
                            <div className="detail-label">
                              Guests
                            </div>
                            <div className="detail-data">
                              { this.props.queryParams.guests }
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-3">
                            <div className="detail-label">
                              Address
                            </div>
                            <div className="detail-data">
                                <div> { this.props.details.hotelAddress } </div>
                                <div> { this.props.details.hotelCity } </div>
                                <div> { this.props.details.hotelState } - { this.props.details.hotelZip} </div>
                            </div>
                        </div>
                        <div className="col-xs-3">
                            <div className="detail-label">
                              Contact
                            </div>
                            <div className="detail-data">
                                { this.props.details.hotelPhoneNumber }
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
