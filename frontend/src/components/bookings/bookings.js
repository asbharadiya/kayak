import React, { Component } from 'react';
import {connect} from 'react-redux';
import './bookings.css';

class Bookings extends Component {

    render() {
        return (
            <div className="bookings-page-wrapper">

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Bookings);