import React, { Component } from 'react';
import './hotelRow.css';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

class HotelRow extends Component {


    render() {
        return (
            <div className="hotels-row col-md-12 no-padding">
              <div className="hotel-image col-md-3 no-padding">
                <img className="img-responsive" src="/assets/images/hotel_placeholder.png" alt="hotel-thumb"></img>
              </div>
              <div className="title-section col-md-9">
                <div className="hotel-title">
                  Demo Hotel, A luxury Hotel In San Jose, CA, USA
                </div>
              </div>
            </div>
        );
    }
}

export default HotelRow;
