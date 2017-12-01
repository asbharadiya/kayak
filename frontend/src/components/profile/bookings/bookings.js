import React, { Component } from 'react';
import {connect} from 'react-redux';
import './bookings.css';

class Bookings extends Component {

    render() {
        return (
            <div className="profile-panel bookings-page-wrapper">
                <div className="profile-panel-body">

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Bookings);