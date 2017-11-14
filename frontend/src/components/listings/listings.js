import React, { Component } from 'react';
import './listings.css';
import Search from './search/search';
import Filters from './filters/filters';
import Sorts from './sorts/sorts';
import Content from './content/content';

class Listings extends Component {

  	render() {
    	return (
      		<div className="listings-page-wrapper">
      			<div className="inline-search-container">
      				<Search/>
      			</div>
      			<div className="page-container">
      				<div className="filters-container">
      					<Filters/>
      				</div>
      				<div className="center-container">
      					<div className="sorting-container">
      						<Sorts/>
      					</div>
      					<div className="data-container">
      						<Content/>
      					</div>
      				</div>
      			</div>
      		</div>
    	);
  	}
}

export default Listings;
