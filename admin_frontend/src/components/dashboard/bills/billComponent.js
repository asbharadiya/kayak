import React, { Component } from 'react';
import './billComponent.css'
import { Modal } from 'react-bootstrap';
import { getBillById } from '../../../actions/bills'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Loading from 'react-loading-spinner';

class BillComponent extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			bookingId : this.props.bill.bookingId ,
			createdDate : this.props.bill.createdDate , 
			_id : this.props.bill._id ,
			totalAmount : this.props.bill.totalAmount , 
			userId : this.props.bill.userId,
			listingId : this.props.bill.listingId,
			listingType : this.props.bill.listingType,
			userData : this.props.userData,
			listingData : this.props.listingData,
			showBillUpdateModal : false,
		}
	}

	componentWillReceiveProps(newProps) { 
	  this.setState({
		    bookingId : newProps.currentBillToUpdate.bookingId ,
		    createdDate : newProps.currentBillToUpdate.createdDate , 
		    _id : newProps.currentBillToUpdate._id ,
		    totalAmount : newProps.currentBillToUpdate.totalAmount , 
		    userId : newProps.currentBillToUpdate.userId,
		    listingId : newProps.currentBillToUpdate.listingId,
		    listingType : newProps.currentBillToUpdate.listingType,
		    userData : newProps.currentBillToUpdate.userData,
		    listingData :newProps.currentBillToUpdate.listingData
	  });
   }

	render() {
		return (
    		<div className="singleBillComponent">
				<div className="row mainRowDiv" onClick={() => {
						this.props.getBillById(this.props.bill._id);
						this.setState({
							showBillUpdateModal : true
						})
					}}>
					<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 dataDiv">
						<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
							{this.props.bill._id}
						</div>
						<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
							{this.props.bill.bookingId}
						</div>
						<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
							{this.props.bill.listingType}
						</div>
						<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
							{this.props.bill.totalAmount}
						</div>
					</div>
				</div>
				<Modal show={this.state.showBillUpdateModal}  id="billModal" className="billModal">
					<Modal.Body className="billModalBody">
						<div className="scrollDiv">
							<div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label className="col-md-4">Bill Id</label>
					      		<div className="col-md-8" id="billname">{this.state._id}</div>
				      		</div>
					      	<div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label className="col-md-4">Booking Id</label>
					      		<div className="col-md-8" id="bookingId">{this.state.bookingId}</div>
				      		</div>
							<div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label className="col-md-4">Puchase Date</label>
					      		<div className="col-md-8" id="createdDate">{this.state.createdDate}</div>
				      		</div>
					      	<div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label className="col-md-4">Listing Type</label>
					      		<div className="col-md-8" id="listingType">{this.state.listingType}</div>
				      		</div>
							<div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label className="col-md-4">Total Amount</label>
					      		<div className="col-md-8" id="totalAmount">{this.state.totalAmount}</div>
				      		</div>
					      	<div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label className="col-md-4">User Name</label>
					      		<div className="col-md-8" id="firstName">{this.state.userData ? (this.state.userData.firstName+" "+this.state.userData.lastName) : null}</div>
				      		</div>
							<div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label className="col-md-4">User Phone Number</label>
					      		<div className="col-md-8" id="lastName">{this.state.userData ? (this.state.userData.phone_number) : null}</div>
				      		</div>
					      	<div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label className="col-md-4">User Email</label>
					      		<div className="col-md-8" id="bookingId">{this.state.userData ? (this.state.userData.email) : null}</div>
				      		</div>
				      		{ this.state.listingData ? <div>
				      			{this.state.listingData.checkInDate && this.state.listingData.checkInDate!="" ? <div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
						      		<label className="col-md-4">Hotel Check In Date</label>
						      		<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.checkInDate) : null}</div>
					      		</div>: null}
				      			{this.state.listingData.checkOutDate && this.state.listingData.checkOutDate!="" ? <div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
						      		<label className="col-md-4">Hotel Check out Date</label>
						      		<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.checkOutDate) : null}</div>
					      		</div>: null}
				      			{this.state.listingData.city && this.state.listingData.city!="" ? <div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
						      		<label className="col-md-4">Hotel City</label>
						      		<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.city) : null}</div>
					      		</div>: null}
				      			{this.state.listingData.phoneNumber && this.state.listingData.phoneNumber!="" ? <div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
						      		<label className="col-md-4">User Phone Number</label>
						      		<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.phoneNumber) : null}</div>
					      		</div>: null}
				      			{this.state.listingData.roomType && this.state.listingData.roomType!="" ? <div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
						      		<label className="col-md-4">Hotel Room Type</label>
						      		<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.roomType) : null}</div>
					      		</div>: null}
				      			{this.state.listingData.StartDate && this.state.listingData.StartDate!="" ? <div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
						      		<label className="col-md-4">Car Rental StartDate</label>
						      		<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.StartDate) : null}</div>
					      		</div>: null}
				      			{this.state.listingData.endDate && this.state.listingData.endDate!="" ? <div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
						      		<label className="col-md-4">Car Rental endDate</label>
						      		<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.endDate) : null}</div>
					      		</div>: null}
				      			{this.state.listingData.licenseNumber && this.state.listingData.licenseNumber!="" ? <div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
						      		<label className="col-md-4">License Number</label>
						      		<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.licenseNumber) : null}</div>
					      		</div>: null}
				      			{this.state.listingData.dest && this.state.listingData.dest!="" ? <div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
						      		<label className="col-md-4">Flight Destination</label>
						      		<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.dest) : null}</div>
					      		</div>: null}
				      			{this.state.listingData.source && this.state.listingData.source!="" ? <div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
						      		<label className="col-md-4">Flight Source</label>
						      		<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.source) : null}</div>
					      		</div>: null}
				      			{this.state.listingData.cabin && this.state.listingData.cabin!="" ? <div className="clearBoth form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
						      		<label className="col-md-4">Flight Cabin</label>
						      		<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.cabin) : null}</div>
					      		</div>: null}
					      	</div> : null}
						</div>
					   </Modal.Body>
					   <Modal.Footer className="billModalFooter">
							<div className="form-group marginBottom15">
								<div className="col-sm-3 col-lg-3 col-md-3 pull-right  text-right">
									<button type="button" className="btn btn-default sharpCornerForInfoButton" onClick={() => {
										this.setState({
											showBillUpdateModal : false
										})
										}}>Close</button>
								</div>
							</div>
					 </Modal.Footer>
				</Modal>
			</div>
  	    );
	}
}

function mapDispatchToProps(dispatch) {
  return {
   	getBillById : (id) => dispatch(getBillById(id))
  };
}

function mapStateToProps(state) {
    return {  currentBillToUpdate : state.billsReducer.currentBillToUpdate };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <BillComponent {...props}/>));