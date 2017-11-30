import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './flightsSearchForm.css';

class FlightsSearchForm extends Component {

	constructor(props) {
		super(props);
		this.search = this.search.bind(this);
  	}

	search() {
        //TODO: take these value from input
        this.props.history.push('/flights/listings?source=San Jose&dest=San Fransisco&date=12-10-2017&travellers=1');
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

export default withRouter(props => <FlightsSearchForm {...props}/>);
