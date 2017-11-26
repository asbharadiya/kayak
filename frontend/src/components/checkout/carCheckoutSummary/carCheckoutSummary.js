import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './carCheckoutSummary.css';


class Checkout extends Component {

	render() {
		

		return (

			 

							<div className="summary-container checkout-panel">
								<div className="checkout-panel-title">
									<p>Summary</p>
								</div>
								<div className="checkout-panel-body">
									
									<div className="panel-body-content">	

										<div className="row single-price-component">
											<div className=" fair-type-div col-lg-8 col-sm-8 col-md-8 col-xs-8 pull-left">
												<div className="fair-type">
													<span >Total Days</span>
												</div>
												
											</div>
											<div className="fair-type-price col-lg-4 col-sm-4 col-md-4 col-xs-4 pull-right">
												<div className="fair-type">
													<span className="price">3</span>
												</div>
											</div>
										</div>

										<div className="row single-price-component">
											<div className=" fair-type-div col-lg-8 col-sm-8 col-md-8 col-xs-8 pull-left">
												<div className="fair-type">
													<span >vendor Base Fare</span>
												</div>
												
											</div>
											<div className="fair-type-price col-lg-4 col-sm-4 col-md-4 col-xs-4 pull-right">
												<div className="fair-type">
													<span className="price">$50</span>
												</div>
											</div>
										</div>

										<div className="row single-price-component">
											<div className=" fair-type-div col-lg-8 col-sm-8 col-md-8 col-xs-8 pull-left">
												<div className="fair-type">
													<span >Total</span>
												</div>
												
											</div>
											<div className="fair-type-price col-lg-4 col-sm-4 col-md-4 col-xs-4 pull-right">
												<div className="fair-type">
													<span className="price">$150</span>
												</div>
											</div>
										</div>

										<div className="row single-price-component">
											<div className=" fair-type-div col-lg-8 col-sm-8 col-md-8 col-xs-8 pull-left">
												<div className="fair-type">
													<span >Tax</span>
												</div>
												
											</div>
											<div className="fair-type-price col-lg-4 col-sm-4 col-md-4 col-xs-4 pull-right">
												<div className="fair-type">
													<span className="price">${0.12 *  150}</span>
												</div>
											</div>
										</div>

										<div className="row single-price-component">
											<div className=" fair-type-div col-lg-8 col-sm-8 col-md-8 col-xs-8 pull-left">
												<div className="fair-type">
													<span >Total Fare</span>
												</div>
												
											</div>
											<div className="fair-type-price col-lg-4 col-sm-4 col-md-4 col-xs-4 pull-right">
												<div className="fair-type">
													<span className="price">{150 + (0.12 *  150)}</span>
												</div>
											</div>
										</div>

										<div className="row single-price-component">

											<div className="buy">
												<button className="btn btn-default btn-kayak" >Pay Now</button>
											</div>


											
										</div>

									</div>

									


								</div>
							</div>
					   

		   
			
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default withRouter(connect(mapStateToProps)(props => <Checkout {...props}/>));