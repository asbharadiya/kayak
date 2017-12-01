import React, { Component } from 'react';
import {connect} from 'react-redux';
import './paymentMethods.css';

class PaymentMethods extends Component {

    render() {
        return (
            <div className="profile-panel payments-page-wrapper">
            	<div className="profile-panel-body">
            		
            	</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(PaymentMethods);