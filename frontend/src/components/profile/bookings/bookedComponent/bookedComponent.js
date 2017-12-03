import React, { Component } from 'react';
import {connect} from 'react-redux';
import './bookedComponent.css';
import { Modal } from 'react-bootstrap';
import * as Profiles from '../../../../api/profile'

class BookedComponent extends Component {

	constructor(props){
		super(props) ;

		this.state = {
			openBookingDetailModal : false ,
			bookingDetails : ''
		}

		this.getBillingDetails = this.getBillingDetails.bind(this) ;
		this.openBillingModal = this.openBillingModal.bind(this);
		this.closeBillingModal = this.closeBillingModal.bind(this); 
	}

	
	openBillingModal(){
		this.setState({ openBookingDetailModal : true })
	}

	closeBillingModal(){
		this.setState({ openBookingDetailModal : false })
	}


	getBillingDetails(){
		var _this = this ; 
		Profiles.getBookingDetailsById(this.props.data.bookingId , function(err , response){
			if(!err){
				response.then(res => {
					_this.setState({bookingDetails : res.data})
				})
			}
		})
	}

    render() {
    	console.log(this.state.bookingDetails) ; 
    	return (
           <div  className="row past-booking-content-list">
	                			<div className="col-md-3 col-lg-3 col-sm-3 col-xs-3">
		                			{this.props.data.bookingId}
		                		</div>
		                		<div className="col-md-2 col-sm-2 col-lg-2 col-xs-2">
		                			 {this.props.data.listingType}
		                		</div>
		                		<div className="col-md-2 col-sm-2 col-lg-2 col-xs-2">
		                			{(this.props.data.createdDate).toString().substr(0,10)}
		                		</div>
		                		<div className="col-md-2 col-sm-2 col-lg-2 col-xs-2">
		                			${this.props.data.totalAmount}
		                		</div>
		                		<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
		                			<a onClick={this.openBillingModal}>View</a>
		                		</div>



		                		 <Modal show={this.state.openBookingDetailModal}  onEntered={this.getBillingDetails} id="carModal" className="booking-detail-modal">

				                    <Modal.Body>
				                       
				                    {
				                    	this.state.bookingDetails.date !== undefined ?

				                    	<div className="booking-panel-body-component">

											<div className="row single-price-component">
												<div className=" fair-type-div col-xs-7 pull-left">
													<div className="fair-type">
														<span >Billing ID</span>
													</div>

												</div>
												<div className="fair-type-price col-xs-5 pull-right">
													<div className="fair-type">
														<span className="price">{this.state.bookingDetails.billingId}</span>
													</div>
												</div>
											</div>

											<div className="row single-price-component">
												<div className=" fair-type-div col-xs-7 pull-left">
													<div className="fair-type">
														<span >Purchase-Type</span>
													</div>

												</div>
												<div className="fair-type-price col-xs-5 pull-right">
													<div className="fair-type">
														<span className="price">{this.state.bookingDetails.commodity}</span>
													</div>
												</div>
											</div>

											<div className="row single-price-component">
												<div className=" fair-type-div col-xs-7 pull-left">
													<div className="fair-type">
														<span >Amount</span>
													</div>

												</div>
												<div className="fair-type-price col-xs-5 pull-right">
													<div className="fair-type">
														<span className="price">${this.state.bookingDetails.amount}</span>
													</div>
												</div>
											</div>

											<div className="row single-price-component">
												<div className=" fair-type-div col-xs-7 pull-left">
													<div className="fair-type">
														<span >Purchase Date</span>
													</div>

												</div>
												<div className="fair-type-price col-xs-5 pull-right">
													<div className="fair-type">
														<span className="price">{ (this.state.bookingDetails.date).toString().substr(0,10)}</span>
													</div>
												</div>
											</div>


											
													<div className="row single-price-component">
														<div className=" fair-type-div col-xs-7 pull-left">
															<div className="fair-type">
																<span >

																	{ this.state.bookingDetails.commodity === "cars"  ?
																		<span>Duration</span>
																		:
																		(
																			this.state.bookingDetails.commodity === "flights" ?
																			<span>Journey Date</span>
																			:
																			<span>Hotel Stay</span>
																		)
																	}
																</span>
															</div>

														</div>

														<div className="fair-type-price col-xs-5 pull-right">
															<div className="fair-type">
																
																{
																	this.state.bookingDetails.commodity === "cars"  ?

																	<span className="price">
																		{ (this.state.bookingDetails.bookingInfo.startDate).toString().substr(0,10)}
																		<span>-</span>
																		{ (this.state.bookingDetails.bookingInfo.endDate).toString().substr(0,10)}
	    															</span>

	    															:

	    															(
	    																this.state.bookingDetails.commodity === "flights"  ?
	    																<span>{this.state.bookingDetails.bookingInfo.date}</span>
	    																:
	    																<span className="price">{this.state.bookingDetails.bookingInfo.checkInDate} - {this.state.bookingDetails.bookingInfo.checkOutDate}</span>
	    															)
	    															
																}

																
															</div>
														</div>
													</div>

													<div className="row single-price-component">
														<div className=" fair-type-div col-xs-7 pull-left">
															<div className="fair-type">
																{
																	this.state.bookingDetails.commodity === "cars"  ?
																 	<span >City</span>
																 	:
																 	(
																 		this.state.bookingDetails.commodity === "flights"  ?
																 		<span>From - To</span>
																 		:
																 		<span>Hotel</span>

																 	)
																}
															</div>

														</div>
														<div className="fair-type-price col-xs-5 pull-right">
															<div className="fair-type">
																{
																	this.state.bookingDetails.commodity === "cars"  ?
																	<span className="price">{this.state.bookingDetails.bookingInfo.city}</span>
																	:
																	(
																		this.state.bookingDetails.commodity === "flights"  ?
																		<span className="price">{this.state.bookingDetails.bookingInfo.source} - {this.state.bookingDetails.bookingInfo.dest}</span>
																		:
																		<span>{this.state.bookingDetails.bookingInfo.city} - {this.state.bookingDetails.bookingInfo.roomType}</span>
																	)
																 	
																 	
																 	
																}
																
															</div>
														</div>
													</div>
											

												{
													this.state.bookingDetails.commodity === "flights" ?
													<div className="row single-price-component">
														<div className=" fair-type-div col-xs-7 pull-left">
															<div className="fair-type">
																<span ># of travellers</span>
															</div>

														</div>
														<div className="fair-type-price col-xs-5 pull-right">
															<div className="fair-type">
																<span className="price">{this.state.bookingDetails.bookingInfo.travelers}</span>
															</div>
														</div>
													</div>
													:
													<div></div>

												}
										

											

											
										</div>

										:

										<div></div>
				                    }
				                        
				                    </Modal.Body>

				                    <Modal.Footer className="billing-details-footer">
				                        
				                        <button className="btn btn-default btn-kayak btn-kayak-default width-40" onClick={this.closeBillingModal}>Close</button>
				                    </Modal.Footer>

				                </Modal>
	      </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(BookedComponent);