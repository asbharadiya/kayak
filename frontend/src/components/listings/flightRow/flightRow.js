import React, { Component } from 'react';
import './flightRow.css';

class FlightRow extends Component {

  	render() {
    	return (
      		<div className="flights-row">
                <div className="info-section">
                    <div className="info-child carrier">
                        <p className="name">American Airlines</p>
                    </div>
                    <div className="info-child time">
                        <div className="dep">
                            <p>5:40 am</p>
                            <span>SFO</span>
                        </div>
                        <div className="divider"></div>
                        <div className="arr">
                            <p>7:13 am</p>
                            <span>LAX</span>
                        </div>
                    </div>
                    <div className="info-child duration">
                        <p className="duration">1h 46m</p>
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

export default FlightRow;
