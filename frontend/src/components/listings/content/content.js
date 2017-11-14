import React, { Component } from 'react';
import './content.css';
import FlightRow from './flightRow/flightRow';

class Content extends Component {

  	render() {
    	return (
      		<div className="data-content">
      			<FlightRow/>
      			<FlightRow/>
      		</div>
    	);
  	}
}

export default Content;
