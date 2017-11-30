import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './flightCheckoutSummary.css';

class FlightCheckoutSummary extends Component {

    constructor(props){
        super(props);
        const fare = this.props.queryParams.cabin === 'economy' ? this.props.details.economyClassPrice:(this.props.queryParams.cabin === 'firstClass' ? this.props.details.firstClassPrice:this.props.details.businessClassPrice)
        this.state = {
            baseFare:fare,
            subtotal:fare*this.props.queryParams.travelers,
            total:fare*this.props.queryParams.travelers
        }
    }

    componentDidMount(){
        this.props.updateTotal(this.state.total);
    }

    render() {
        return (
            <div className="flight-checkout-summary">
                <div className="row summary-row">
                    <div className="col-xs-6">
                        <p className="label-text">Base fare</p>
                    </div>
                    <div className="col-xs-6 text-right">
                        <p className="value">${this.state.baseFare}</p>
                    </div>
                </div>
                <div className="row summary-row">
                    <div className="col-xs-6">
                        <p className="label-text">No of travellers</p>
                    </div>
                    <div className="col-xs-6 text-right">
                        <p className="value">{this.props.queryParams.travelers}</p>
                    </div>
                </div>
                <div className="row summary-row">
                    <div className="col-xs-6">
                        <p className="label-text">Subtotal</p>
                    </div>
                    <div className="col-xs-6 text-right">
                        <p className="value">${this.state.subtotal}</p>
                    </div>
                </div>
                <div className="row summary-row total-row">
                    <div className="col-xs-6">
                        <p className="label-text">Total</p>
                    </div>
                    <div className="col-xs-6 text-right">
                        <p className="value">${this.state.total}</p>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(mapStateToProps)(props => <FlightCheckoutSummary {...props}/>));