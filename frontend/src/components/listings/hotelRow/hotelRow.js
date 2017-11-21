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
                        <img class="placeholder-image" src="/assets/images/hotel_placeholder.png"></img>
                    </div>
                </div>
                <div className="title-section">
                  <div className="hotel-title">
                      Demo Hotel, A luxury Hotel In San Jose, CA, USA
                    </div>
                  <div className="rating">
                    <Rater total={5} rating={4} interactive={false}/>
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
