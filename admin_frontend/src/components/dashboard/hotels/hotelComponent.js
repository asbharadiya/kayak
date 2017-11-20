import React, { Component } from 'react';
import './hotelComponent.css'
import { Modal } from 'react-bootstrap';
import { deleteHotelById , updateHotelById , setBackHotelUpdateSuccess , getHotelById } from '../../../actions/hotels'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Loading from 'react-loading-spinner';

class HotelComponent extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			openDeleteModal : false,
			showHotelUpdateModal : false,
			hotelName : this.props.currentHotelToUpdate.hotelName ,
			hotelAddress : this.props.currentHotelToUpdate.hotelAddress , 
			hotelCity : this.props.currentHotelToUpdate.hotelCity ,
			hotelState : this.props.currentHotelToUpdate.hotelState , 
			hotelZip : this.props.currentHotelToUpdate.hotelZip,
			hotelStar : this.props.currentHotelToUpdate.hotelStar,
			hotelRating : this.props.currentHotelToUpdate.hotelRating,
			hotelPhoneNumber : this.props.currentHotelToUpdate.hotelPhoneNumber,
			hotelEmail : this.props.currentHotelToUpdate.hotelEmail,
			_id : '' ,
			updateHotelError : '' ,
			hotelUpdateLoading : false , 
			serviceStartDate : '' ,
			serviceEndDate : '',
			createdDate : '' ,
			updatedDate : ''
		}
	}

	componentWillReceiveProps(newProps) { 
	
	  this.setState({
			hotelName : newProps.currentHotelToUpdate.hotelName ,
			hotelAddress : newProps.currentHotelToUpdate.hotelAddress , 
			hotelCity : newProps.currentHotelToUpdate.hotelCity ,
			hotelState : newProps.currentHotelToUpdate.hotelState , 
			hotelZip : newProps.currentHotelToUpdate.hotelZip,
			hotelStar : newProps.currentHotelToUpdate.hotelStar,
			hotelRating : newProps.currentHotelToUpdate.hotelRating,
			hotelPhoneNumber : newProps.currentHotelToUpdate.hotelPhoneNumber,
			hotelEmail : newProps.currentHotelToUpdate.hotelEmail,
			serviceStartDate : newProps.currentHotelToUpdate.serviceStartDate ,
			serviceEndDate : newProps.currentHotelToUpdate.serviceEndDate ,
			_id : newProps.currentHotelToUpdate._id,
			createdDate : newProps.currentHotelToUpdate.createdDate ,
			updatedDate : newProps.currentHotelToUpdate.updatedDate 
	  })

      if(newProps.hotelUpdateSuccess != null && newProps.hotelUpdateSuccess){
      	
      	this.setState({hotelUpdateLoading : false , showHotelUpdateModal : false}) ;

      	//setBack success for hotelAddSuccess
      	this.props.setBackHotelUpdateSuccess();
      }
   }

	render() {
		console.log("Plash " , this.state) ; 
		return (
    		<div className="singleHotelComponent">
				<div className="row mainRowDiv">
					<div className="col-md-10 col-sm-10 col-lg-10 col-xs-10 dataDiv">
						<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
							{this.props.hotel.hotelName}
						</div>
						<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4">
							{this.props.hotel.hotelAddress},
							{this.props.hotel.hotelCity},
							{this.props.hotel.hotelState},
							{this.props.hotel.hotelZip}
						</div>
						<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4">
							{this.props.hotel.hotelPhoneNumber},
							{this.props.hotel.hotelEmail}
						</div>
						<div className="col-md-1 col-sm-1 col-lg-1 col-xs-1">
							{this.props.hotel.hotelStar}
						</div>
					</div>
					<div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 buttonGroup ">						
						<a><i className="fa fa-pencil-square-o fa-2x updateFontAwesome" aria-hidden="true" onClick={() => {
							this.props.getHotelById(this.props.hotel._id)
							this.setState({
								showHotelUpdateModal : true
							})
						}}></i></a>						
						<a className="redIcon"><i className="fa fa-times fa-2x" aria-hidden="true" onClick={() => {
							this.setState({
								openDeleteModal : true
							})
						}}></i></a>						
					</div>

				</div>

				 <Modal show={this.state.openDeleteModal}  id="hotelModal" className="hotelModal">

					<Modal.Body className="hotelDeleteBody">
						<b>Are you sure to delete {this.props.hotel.hotelName } ?  </b>
					</Modal.Body>

					<Modal.Footer className="hotelDeleteFooter">
						 <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12">
							<div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-md-offset-4 col-xs-offset-4 col-lg-offset-4 col-sm-offset-4">
								<button className="btn btn-danger sharpCornerForInfoButton" onClick={() => {
									this.props.deleteHotelById(this.props.hotel._id)
									this.setState({openDeleteModal : false})
								}}>YES</button>
							</div>
							<div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 ">
								<button className="btn sharpCornerForInfoButton" onClick={() => {
									this.setState({openDeleteModal : false})
								}}>NO</button>
							</div>
						 </div>
					</Modal.Footer>

				</Modal>

				<Modal show={this.state.showHotelUpdateModal}  id="hotelModal" className="hotelModal">
					<Modal.Body className="hotelModalBody">

						<div className="scrollDiv">

							<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
								<label htmlFor="hotelname">Hotel Name</label>
								<input value={this.state.hotelName}  className="form-control sharpCorner" onChange={(e) => {
									this.setState({
										hotelName : e.target.value
									})
								}} id="hotelname" type="text"  aria-describedby="basic-addon1"   />
							</div>

							<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
								<label htmlFor="hotelAddress">Address</label>
								<input value={this.state.hotelAddress}  className="form-control sharpCorner" onChange={(e) => {
									this.setState({
										hotelAddress : e.target.value
									})
								}} id="hotelAddress" type="text"  aria-describedby="basic-addon1"   />
							</div>

							<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
								<label htmlFor="hotelCity">City</label>
								<input value={this.state.hotelCity}  className="form-control sharpCorner" onChange={(e) => {
									this.setState({
										hotelCity : e.target.value
									})
								}} id="hotelCity" type="text"  aria-describedby="basic-addon1"   />
							</div>
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="hotelState">State</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				hotelState : e.target.value
					      			})
					      		}} id="hotelState" type="text"  aria-describedby="basic-addon1"   />
					      	</div>
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="hotelZip">Zip</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				hotelZip : e.target.value
					      			})
					      		}} id="hotelZip" type="text"  aria-describedby="basic-addon1"   />
					      	</div>
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="hotelPhoneNumber">Phone Number</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				hotelPhoneNumber : e.target.value
					      			})
					      		}} id="hotelPhoneNumber" type="text"  aria-describedby="basic-addon1"   />
					      	</div>
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="hotelEmail">Email</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				hotelEmail : e.target.value
					      			})
					      		}} id="hotelEmail" type="text"  aria-describedby="basic-addon1"   />
					      	</div>
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="hotelStar">Star</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				hotelStar : e.target.value
					      			})
					      		}} id="hotelStar" type="text"  aria-describedby="basic-addon1"   />
					      	</div>
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="hotelRating">Overall rating</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				hotelRating : e.target.value
					      			})
					      		}} id="hotelRating" type="text"  aria-describedby="basic-addon1"   />
					      	</div>

							<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="serviceAvailable">Service Start Date</label>
					      		<input className="form-control  sharpCorner" id="serviceAvailable" type="date"  onChange={(e) => {
					      				this.setState({
					      					serviceStartDate : e.target.value
					      				})
					      		}} aria-describedby="basic-addon1"   />
					      		<div className="UpdatedDate">{this.state.serviceStartDate}</div>
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="serviceAvailable">Service End Date</label>
					      		<input  className="form-control  sharpCorner" id="serviceAvailable" type="date"  onChange={(e) => {
					      				this.setState({
					      					serviceEndDate : e.target.value
					      				})
					      		}} aria-describedby="basic-addon1"   />
					      		<div className="UpdatedDate">{this.state.serviceEndDate}</div>
					      	</div>
						</div>

					   </Modal.Body>
					   <Modal.Footer className="hotelModalFooter">
								<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
									<div className="col-sm-5 col-lg-5 col-md-5 pull-right  text-right">
										<Loading isLoading={this.state.hotelUpdateLoading} ></Loading>
									</div>
								</div>

								<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2 hotelAddErrorText">
									{this.state.updateHotelError}

								</div>


								<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">

									<div className="col-sm-3 col-lg-3 col-md-3 pull-right  text-right">
										<button type="button" className="btn btn-default sharpCornerForInfoButton" onClick={() => {
											this.setState({
												showHotelUpdateModal : false
											})
											}}>Close</button>
									</div>
									<div className="col-sm-9 col-lg-9 col-md-9 pull-right  text-right">

										<button type="button" className="btn btn-info sharpCornerForInfoButton" onClick={() => {
											var startDate = new Date(this.state.serviceStartDate);
						      				startDate.setDate(startDate.getDate() + 1);
						      				var endDate = new Date(this.state.serviceEndDate);
						      				endDate.setDate(endDate.getDate() + 1);	
											if(this.state.hotelName === '' ){
						      					this.setState({ updateHotelError : "Please enter Hotel Name"})
						      					return ;
						      				}
						      				if(this.state.hotelAddress === '' ){
						      					this.setState({ updateHotelError : "Please enter Hotel Address"})
						      					return ;
						      				}
						      				if(this.state.hotelCity === '' ){
						      					this.setState({ updateHotelError : "Please enter Hotel City"})
						      					return ;
						      				}
						      				if(this.state.hotelState === '' ){
						      					this.setState({ updAtehoTelerror : "Please enter Hotel Name"})
						      					return ;
						      				}
						      				if(this.state.hotelZip === '' ){
						      					this.setState({ updAtehoTelerror : "Please enter Hotel Name"})
						      					return ;
						      				}
						      				if(this.state.hotelPhoneNumber === '' ){
						      					this.setState({ updAtehoTelerror : "Please enter Hotel Name"})
						      					return ;
						      				}
						      				if(this.state.hotelEmail === '' ){
						      					this.setState({ updAtehoTelerror : "Please enter Hotel Name"})
						      					return ;
						      				}
						      				if(this.state.hotelStar === '' ){
						      					this.setState({ updAtehoTelerror : "Please enter Hotel Name"})
						      					return ;
						      				}
						      				if(this.state.hotelRating === '' ){
						      					this.setState({ updAtehoTelerror : "Please enter Hotel Name"})
						      					return ;
						      				}
						      				if(this.state.serviceStartDate === ''){
						      					this.setState({ updAtehoTelerror : "Please enter service start date"})
						      					return
						      				}						      				
						      				if(this.state.serviceEndDate === ''){
						      					this.setState({ updAtehoTelerror : "Please enter service end date"})
						      					return
						      				}
											var obj = {
												hotelName : this.state.hotelName ,
												hotelAddress : this.state.hotelAddress,
												hotelCity : this.state.hotelCity,
												hotelState : this.state.hotelState,
												hotelZip : this.state.hotelZip,
												hotelStar : this.state.hotelStar,
												hotelRating : this.state.hotelRating,
												hotelPhoneNumber : this.state.hotelPhoneNumber,
												hotelEmail : this.state.hotelEmail,
												serviceStartDate : this.state.serviceStartDate,
												serviceEndDate : this.state.serviceEndDate,
												is_deleted : false,
												_id  : this.state._id,
												createdDate : this.state.createdDate ,
												updatedDate : this.state.updatedDate
											}
											this.setState({ updateHotelError : '' , hotelUpdateLoading : true})

											this.props.updateHotelById(obj)
										}} >Update
										</button>

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
    deleteHotelById : (id) => dispatch(deleteHotelById(id)) ,
   	updateHotelById: (obj) => dispatch(updateHotelById(obj)) ,
   	setBackHotelUpdateSuccess : () => dispatch(setBackHotelUpdateSuccess()) ,
   	getHotelById : (id) => dispatch(getHotelById(id))
  };
}

function mapStateToProps(state) {
    return {
        listOfHotels : state.hotelsReducer.allHotels , 
        hotelAddSuccess : state.hotelsReducer.hotelAddSuccess,
        hotelUpdateSuccess : state.hotelsReducer.hotelUpdateSuccess,
        currentHotelToUpdate : state.hotelsReducer.currentHotelToUpdate
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <HotelComponent {...props}/>));
