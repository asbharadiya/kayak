import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './carsSearchForm.css';
import * as analytics from '../../../../actions/analytics';
import {connect} from 'react-redux';

class CarsSearchForm extends Component {

	constructor(props) {
		super(props);
		this.search = this.search.bind(this);
  }

	trackClick(click, page) {
			var payload = {'click' : click, 'page' : page};
			this.props.trackClick(payload);
	}

	search() {
		this.trackClick('cars-search', '/cars/listings')
		//TODO: take these value from input
		this.props.history.push('/cars/listings?city=San Jose&startDate=12-10-2017&endDate=12-13-2017');
	}

  	render() {
	  	return (
	      	<div className="form-container">
	        	<div className="form-body">
	        		<div className="button-col">
	        			<button className="btn btn-primary btn-kayak" onClick={this.search}>
	        				<i className="fa fa-long-arrow-right fa-2x" aria-hidden="true"></i>
	        			</button>
	        		</div>
	        		<div className="fields-col">
	        			<div className=" field-container pickup">
	        				<input type="text" className="form-control"/>
	        			</div>
	        			<div className="field-container pickup-date">
	        				<input type="text" className="form-control"/>
	        			</div>
	        			<div className="field-container dropoff-date">
	        				<input type="text" className="form-control"/>
	        			</div>
	        		</div>
	        	</div>
	      	</div>
	    );
  	}
}


function mapStateToProps(state) {
    return {
		};
}

function mapDispatchToProps(dispatch) {
    return {
        trackClick : (payload) => dispatch(analytics.trackClick(payload))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(props => <CarsSearchForm {...props}/>));
