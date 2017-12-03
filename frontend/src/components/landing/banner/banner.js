import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './banner.css';
import HotelsSearchForm from './hotelsSearchForm/hotelsSearchForm';
import FlightsSearchForm from './flightsSearchForm/flightsSearchForm';
import CarsSearchForm from './carsSearchForm/carsSearchForm';

class Banner extends Component {

  	render() {
  		const category = this.props.match.params.category;
	    return (
	      <div className="banner-section">
	        <div className="bg-wrapper"></div>
	        <div className="bg-overlay">
	        	<div className="bg-overlay-content">
	        		<div className="title-section">
	        			<h2>Search hundreds of travel sites at once</h2>
	        		</div>
	        		<div className="nav-section">
	        			<ul className="nav">
	  						<li className="nav-item">
	  							<NavLink to="/hotels">
	  								Hotels
	  							</NavLink>
	  						</li>
	  						<li className="nav-item">
	  							<NavLink to="/flights">
	  								Flights
	  							</NavLink>
	  						</li>
	  						<li className="nav-item">
	  							<NavLink to="/cars">
	  								Cars
	  							</NavLink>
	  						</li>
	  					</ul>
	        		</div>
	        		<div className="form-section">
	        			{
	        				category === 'hotels' ? (
	        					<HotelsSearchForm/>
	        				) : category === 'flights' ? (
	        					<FlightsSearchForm/>
	        				) : (
	        					<CarsSearchForm/>
	        				)
	        			}
	        		</div>
	        	</div>
	        </div>
	      </div>
	    );
  	}
}

export default withRouter(props => <Banner {...props}/>);
