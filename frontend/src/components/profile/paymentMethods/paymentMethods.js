import React, { Component } from 'react';
import {connect} from 'react-redux';
import './paymentMethods.css';

class PaymentMethods extends Component {

    render() {
        return (
            <div className="payments-page-wrapper">

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(PaymentMethods);