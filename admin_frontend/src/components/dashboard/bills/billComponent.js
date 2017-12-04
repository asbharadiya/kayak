import React, { Component } from 'react';
import './billComponent.css'
import { Modal } from 'react-bootstrap';
import * as api from '../../../api/bills';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class BillComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            showBillUpdateModal : false
        }
        this.fetchBillData = this.fetchBillData.bind(this);
    }

    fetchBillData(){
        var _this = this;
        api.getBillById(this.props.bill._id, function(error, response){
            if(error){

            } else {
                response.then((res) => {
                    if(res.status === 200){
                        _this.setState({
                            bookingId : res.data.bookingId ,
                            createdDate : res.data.createdDate ,
                            _id : res.data._id ,
                            totalAmount : res.data.totalAmount ,
                            userId : res.data.userId,
                            listingId : res.data.listingId,
                            listingType : res.data.listingType,
                            userData : res.data.userData,
                            listingData :res.data.listingData
                        })
                    }else{

                    }
                })
            }
        })
	}

    render() {
        console.log(this.state);
        return (
			<div className="singleComponent">
				<div className="row mainRowDiv pointer" onClick={() => {
                    this.setState({
                        showBillUpdateModal : true
                    })
                }}>
					<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12">
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
				<Modal show={this.state.showBillUpdateModal}  id="billModal" onEntered={this.fetchBillData}>
					<Modal.Body>
						<div className="row form-group col-sm-offset-2 col-sm-8">
							<label className="col-md-4">Bill Id</label>
							<div className="col-md-8" id="billname">{this.state._id}</div>
						</div>
						<div className="row form-group col-sm-offset-2 col-sm-8">
							<label className="col-md-4">Billing Date</label>
							<div className="col-md-8" id="createdDate">{this.state.createdDate}</div>
						</div>
                        <div className="row form-group col-sm-offset-2 col-sm-8">
                            <label className="col-md-4">User Name</label>
                            <div className="col-md-8" id="firstName">{this.state.userData ? (this.state.userData.firstName+" "+this.state.userData.lastName) : null}</div>
                        </div>
                        <div className="row form-group col-sm-offset-2 col-sm-8">
                            <label className="col-md-4">Total Amount</label>
                            <div className="col-md-8" id="totalAmount">{this.state.totalAmount}</div>
                        </div>
                        <div className="row form-group col-sm-offset-2 col-sm-8">
                            <label className="col-md-12">Booking Information</label>
                        </div>
                        <div className="row form-group col-sm-offset-2 col-sm-8">
							<label className="col-md-4">Booking Type</label>
							<div className="col-md-8" id="listingType">{this.state.listingType}</div>
						</div>
						{ this.state.listingData ? <div>
                            {this.state.listingData.checkInDate && this.state.listingData.checkInDate!=="" ? <div className="row form-group col-sm-offset-2 col-sm-8">
								<label className="col-md-4">Hotel Check In Date</label>
								<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.checkInDate) : null}</div>
							</div>: null}
                            {this.state.listingData.checkOutDate && this.state.listingData.checkOutDate!=="" ? <div className="row form-group col-sm-offset-2 col-sm-8">
								<label className="col-md-4">Hotel Check Out Date</label>
								<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.checkOutDate) : null}</div>
							</div>: null}
                            {this.state.listingData.city && this.state.listingData.city!=="" ? <div className="row form-group col-sm-offset-2 col-sm-8">
								<label className="col-md-4">Hotel City</label>
								<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.city) : null}</div>
							</div>: null}
                            {this.state.listingData.phoneNumber && this.state.listingData.phoneNumber!=="" ? <div className="row form-group col-sm-offset-2 col-sm-8">
								<label className="col-md-4">Contact Number</label>
								<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.phoneNumber) : null}</div>
							</div>: null}
                            {this.state.listingData.roomType && this.state.listingData.roomType!=="" ? <div className="row form-group col-sm-offset-2 col-sm-8">
								<label className="col-md-4">Hotel Room Type</label>
								<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.roomType) : null}</div>
							</div>: null}
                            {this.state.listingData.StartDate && this.state.listingData.StartDate!=="" ? <div className="row form-group col-sm-offset-2 col-sm-8">
								<label className="col-md-4">Car Rental StartDate</label>
								<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.startDate) : null}</div>
							</div>: null}
                            {this.state.listingData.endDate && this.state.listingData.endDate!=="" ? <div className="row form-group col-sm-offset-2 col-sm-8">
								<label className="col-md-4">Car Rental endDate</label>
								<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.endDate) : null}</div>
							</div>: null}
                            {this.state.listingData.licenseNumber && this.state.listingData.licenseNumber!=="" ? <div className="row form-group col-sm-offset-2 col-sm-8">
								<label className="col-md-4">License Number</label>
								<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.licenseNumber) : null}</div>
							</div>: null}
                            {this.state.listingData.source && this.state.listingData.source!=="" ? <div className="row form-group col-sm-offset-2 col-sm-8">
                                <label className="col-md-4">Flight Source</label>
                                <div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.source) : null}</div>
                            </div>: null}
                            {this.state.listingData.dest && this.state.listingData.dest!=="" ? <div className="row form-group col-sm-offset-2 col-sm-8">
								<label className="col-md-4">Flight Destination</label>
								<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.dest) : null}</div>
							</div>: null}
                            {this.state.listingData.cabin && this.state.listingData.cabin!=="" ? <div className="row form-group col-sm-offset-2 col-sm-8">
								<label className="col-md-4">Flight Cabin</label>
								<div className="col-md-8" id="bookingId">{this.state.listingData ? (this.state.listingData.cabin) : null}</div>
							</div>: null}
						</div> : null}
					</Modal.Body>
					<Modal.Footer>
						<div className="row form-group col-sm-offset-2 col-sm-8">
							<div className="col-sm-12 text-right">
								<button type="button" className="btn btn-default btn-kayak btn-kayak-default" onClick={() => {
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

    };
}

function mapStateToProps(state) {
    return {  };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <BillComponent {...props}/>));
