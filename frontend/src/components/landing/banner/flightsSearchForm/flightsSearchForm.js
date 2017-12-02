import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './flightsSearchForm.css';
import * as analytics from '../../../../actions/analytics';
import {connect} from 'react-redux';

class FlightsSearchForm extends Component {

	constructor(props) {
		super(props);
		this.search = this.search.bind(this);
  	}

	trackClick(click, page) {
			var payload = {'click' : click, 'page' : page};
			this.props.trackClick(payload);
	}

	search() {
				this.trackClick('flights-search', 'home')
        //TODO: take these value from input
        this.props.history.push('/flights/listings?source=San Jose&dest=San Fransisco&date=12-10-2017&travelers=1&cabin=economy');
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
	        			<div className=" field-container source">
	        				<input type="text" className="form-control"/>
	        			</div>
	        			<div className="field-container destination">
	        				<input type="text" className="form-control"/>
	        			</div>
	        			<div className="field-container dates">
	        				<input type="text" className="form-control"/>
	        			</div>
	        			<div className="field-container travelers">
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(props => <FlightsSearchForm {...props}/>));
