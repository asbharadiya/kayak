import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './flightCheckoutSummary.css';

class FlightCheckoutSummary extends Component {

    render() {
        return (
            <div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(mapStateToProps)(props => <FlightCheckoutSummary {...props}/>));