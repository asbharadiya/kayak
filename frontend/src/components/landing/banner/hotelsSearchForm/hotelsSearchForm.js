import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './hotelsSearchForm.css';

class HotelsSearchForm extends Component {

	constructor(props) {
		super(props);
		this.search = this.search.bind(this);
  	}

	search() {
		this.props.history.push('/hotels/listings?city=test city&checkInDate=12-10-2017&checkOutDate=12-15-2017&guests=2&roomType=conference');

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
	        			<div className=" field-container location">
	        				<input type="text" className="form-control"/>
	        			</div>
	        			<div className="field-container checkInDate">
	        				<input type="text" className="form-control"/>
	        			</div>
								<div className="field-container checkOutDate">
									<input type="text" className="form-control"/>
								</div>
	        			<div className="field-container guests">
	        				<input type="text" className="form-control"/>
	        			</div>
	        		</div>
	        	</div>
	      	</div>
	    );
  	}
}

export default withRouter(props => <HotelsSearchForm {...props}/>);
