import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './flightCheckoutDetails.css';

class FlightCheckoutDetails extends Component {

    constructor(props){
        super(props) ;
        this.duration = this.timeDiff(this.props.details.arrival, this.props.details.departure);
    }

    timeDiff(first, second) {
        var f = first.split(':'), s = second.split(':');
        var fh = parseInt(f[0], 10);
        var fm = parseInt(f[1], 10);
        var sh = parseInt(s[0], 10);
        var sm = parseInt(s[1], 10);

        var minutes = 0;
        if(fh<sh) {
            minutes = ((fh*60)+fm) + ((24*60)-((sh*60)+sm));
        } else {
            minutes = ((fh*60)+fm) - ((sh*60)+sm);
        }
        return (minutes/60 < 1 ? '':(Math.floor(minutes/60))+'h ') + (minutes%60 < 1 ? '':(minutes%60+'m'));
    }

    render() {
        return (
            <div className="flight-checkout-details">
                <div className="info-section">
                    <div className="first travel-date-row">
                        <label>Date of travel: </label><p>{this.props.queryParams.date}</p>
                    </div>
                    <div className="first">
                        <div className="info-child carrier">
                            <p className="name">{this.props.details.flightNumber}</p>
                            <p className="name">{this.props.details.airline}</p>
                        </div>
                        <div className="info-child time">
                            <div className="dep">
                                <p>{this.props.details.departure}</p>
                                <span>{this.props.details.source}</span>
                            </div>
                            <div className="divider"></div>
                            <div className="arr">
                                <p>{this.props.details.arrival}</p>
                                <span>{this.props.details.destination}</span>
                            </div>
                        </div>
                        <div className="info-child duration">
                            <p className="duration">{this.duration}</p>
                        </div>
                    </div>
                    <div className="first amenities-row">
                        <div className="info-child">
                            <label>Cabin: </label><p>{this.props.queryParams.cabin.toUpperCase()}</p>
                        </div>
                        <div className="info-child">
                            <label>No of baggage: </label><p>{this.props.details.baggage}</p>
                        </div>
                        <div className="info-child">
                            <label>Free meal included: </label><p>{this.props.details.mealIncluded}</p>
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

export default withRouter(connect(mapStateToProps)(props => <FlightCheckoutDetails {...props}/>));
