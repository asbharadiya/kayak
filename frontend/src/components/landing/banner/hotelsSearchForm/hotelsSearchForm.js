import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './hotelsSearchForm.css';
import * as analytics from '../../../../actions/analytics';
import {connect} from 'react-redux';

class HotelsSearchForm extends Component {

	constructor(props) {
		super(props);
		this.search = this.search.bind(this);
  	}

	trackClick(click, page) {
			var payload = {'click' : click, 'page' : page};
			this.props.trackClick(payload);
	}

	search() {
		this.trackClick('hotels-search', '/hotels/listings');
		this.props.history.push('/hotels/listings?city=test city&checkInDate=12-10-2017&checkOutDate=12-15-2017&guests=2&roomType=Conference');
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


function mapStateToProps(state) {
    return {
		};
}

function mapDispatchToProps(dispatch) {
    return {
        trackClick : (payload) => dispatch(analytics.trackClick(payload))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(props => <HotelsSearchForm {...props}/>));
