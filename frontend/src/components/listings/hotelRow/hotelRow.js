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
              <div className="title-section col-md-7">
                <div className="hotel-title col-md-12  no-padding">
                  Demo Hotel, A luxury Hotel In San Jose, CA, USA
                </div>
                <div className="star-rating col-md-12 no-padding">
                  <Rater total={5} rating={4} interactive={false}/>
                </div>
                <div className="ratings-container col-md-12 no-padding">
                  <div className="number-rating-container col-md-6">
                    <span className="number-rating"> 9.0 </span>
                      <span className="rating-type"> Excellent </span>
                  </div>
                  <div className="number-rating-container col-md-6">
                      <div className="location"> Location </div>
                      <div className=""> Silicon Valley </div>
                  </div>
                </div>
              </div>
              <div className="price-section col-md-2">
                <p>$983</p>
                <button className="btn btn-primary btn-kayak">Book</button>
              </div>
            </div>
        );
    }
}

export default HotelRow;
