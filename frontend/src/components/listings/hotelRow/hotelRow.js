import React, { Component } from 'react';
import './hotelRow.css';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

class HotelRow extends Component {


    render() {
        return (
          <div className="hotels-row">
                <div className="info-section">
                    <div className="info-child carrier">
                        <img className="placeholder-image" src="/assets/images/hotel_placeholder.png" alt="hotel-thumb"></img>
                    </div>
                </div>
                <div className="title-section">
                  <div className="hotel-title">
                      Demo Hotel, A luxury Hotel In San Jose, CA, USA
                    </div>
                  <div className="star-rating">
                    <Rater total={5} rating={4} interactive={false}/>
                  </div>
                  <div className="ratings-container">
                    <div className="number-rating-container">
                      <span className="number-rating"> 9.0 </span>
                    </div>
                    <div className="comments-container">
                      Excellent
                    </div>
                    <div className="trophy-container">
                      <span className="fa fa-trophy fa-2x champion"> </span>
                    </div>
                    <div className="trophy-container">
                      Business Class Hotel
                    </div>
                  </div>
                  <div className="ratings pull-right">

                  </div>
                  <div className="features-main">
                     <div className="sub-features">
                       <span className="fa fa-check-circle blue-color"></span> Feature one
                     </div>
                     <div className="sub-features">
                       <span className="fa fa-check-circle blue-color"></span> Feature two
                     </div>
                     <div className="sub-features">
                       <span className="fa fa-check-circle blue-color"></span> Feature three
                     </div>
                  </div>
                </div>
                <div className="price-section">

          <p>$983</p>
          <button className="btn btn-primary btn-kayak">Book</button>
        </div>
            </div>
        );
    }
}

export default HotelRow;
