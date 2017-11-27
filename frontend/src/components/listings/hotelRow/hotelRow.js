import React, { Component } from 'react';
import './hotelRow.css';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import RoomType from './roomType';

class HotelRow extends Component {

  constructor(props){
    super(props) ;
    var prices = [];
    {this.props.data.hotelRooms.map((room, key) => {
      prices.push(room.priceTotal);
    })}
    this.minFare = Math.min.apply(null, prices);
    this.maxFare = Math.max.apply(null, prices);
  }
  render() {
    return (
      <div className="hotels-row col-xs-12 no-padding">
        <div className="hotel-image col-xs-3 no-padding">
          <img className="img-responsive" src="/assets/images/hotel_placeholder.png" alt="hotel-thumb"></img>
        </div>
        <div className="title-section col-xs-7">
          <div className="hotel-title col-xs-12  no-padding">
            { this.props.data.hotelName}
          </div>
          <div className="star-rating col-xs-12 no-padding">
            <Rater total={5} rating={this.props.data.hotelStar} interactive={false}/>
          </div>
          <div className="ratings-container col-xs-12 no-padding">
            <div className="number-rating-container col-xs-3 no-padding">
              <span className="number-rating"> {(this.props.data.hotelRating).toFixed(1)} </span>
              <span className="rating-type">
                {this.props.data.hotelRating == 5 ? "Excellent" : ""}
                {this.props.data.hotelRating == 4 ? "Good" : ""}
                {this.props.data.hotelRating == 3 ? "Average" : ""}
                {this.props.data.hotelRating == 2 ? "Below Average" : ""}
                {this.props.data.hotelRating == 1 ? "Poor" : ""}
              </span>
            </div>
            <div className="location-container col-xs-6 no-padding text-center">
              <div className="hotel-location-label col-xs-12"> Location </div>
              <div className="hotel-location-name col-xs-12"> {this.props.data.hotelCity}, {this.props.data.hotelState} </div>
            </div>
            <div className="location-container col-xs-3 no-padding pull-right text-center">
              <div className="hotel-location-label col-xs-12"> Contact </div>
              <div className="hotel-location-name col-xs-12"> {this.props.data.hotelPhoneNumber} </div>
            </div>
          </div>
          <div className="col-xs-12 no-padding">
            {this.props.data.hotelRooms.map((room, key) => {
              return <RoomType data={room}></RoomType>
            })}
          </div>
        </div>
        <div className="price-section col-xs-2 no-padding">
          {
            this.minFare !== this.maxFare ? <p>${this.minFare} - ${this.maxFare}</p> :  <p>${this.minFare} </p>
        }

        <button className="btn btn-primary btn-kayak">Book</button>
      </div>
    </div>
  );
  }
}

export default HotelRow;
