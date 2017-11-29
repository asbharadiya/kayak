import React, { Component } from 'react';
import './flightRow.css';

class FlightRow extends Component {

  	render() {
    	return (
      		<div className="flights-row">
                <div className="info-section">
                    <div className="info-child carrier">
                        <p className="name">{this.props.data.flightNumber}</p>
                        <p className="name">{this.props.data.airline}</p>
                    </div>
                    <div className="info-child time">
                        <div className="dep">
                            <p>{this.props.data.departure}</p>
                            <span>{this.props.data.source}</span>
                        </div>
                        <div className="divider"></div>
                        <div className="arr">
                            <p>{this.props.data.arrival}</p>
                            <span>{this.props.data.destination}</span>
                        </div>
                    </div>
                    <div className="info-child duration">
                        <p className="duration">1h 46m</p>
                    </div>
                </div>
                <div className="price-section">
					<p>$983</p>
					<button className="btn btn-primary btn-kayak" onClick={(id)=>this.props.onBookClick(this.props.data.id)}>Book</button>
				</div>
            </div>
    	);
  	}
}

export default FlightRow;
