import React, { Component } from 'react';
import './roomType.css';

class RoomType extends Component {


  render() {
    return (
      <div className="col-xs-3 roomType-container">
        <div className="roomType-label">
          {this.props.data.roomType}
          </div>
          <div className="roomType-price">
            ${this.props.data.priceTotal}
          </div>
      </div>
    );
  }
}

export default RoomType;
