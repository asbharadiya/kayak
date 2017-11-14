import React, { Component } from 'react';
import './filters.css';

class Filters extends Component {

  	render() {
    	      return (
      		<div className="filters-content">
      			<div className="title-section">
      				<span className="title">Filters</span>
      			</div>
      			<div className="groups-content">
      				<div className="groups-section">
      					<div className="groups-title">
      						Stops
      					</div>
      					<div className="groups-list">
      						<ul>
      							<li>
      								1 stop
      							</li>
      							<li>
      								2 stop
      							</li>
      						</ul>
      					</div>
      				</div>
      				<div className="groups-section">
      					<div className="groups-title">
      						Stops
      					</div>
      					<div className="groups-list">
      						<ul>
      							<li>
      								1 stop
      							</li>
      							<li>
      								2 stop
      							</li>
      						</ul>
      					</div>
      				</div>
      			</div>
      		</div>
    	      );
  	}
}

export default Filters;
