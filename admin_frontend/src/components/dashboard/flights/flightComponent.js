import React, { Component } from 'react';
import './flightComponent.css'
import { Modal } from 'react-bootstrap';
import { deleteFlightById , updateFlightById , setBackFlightUpdateSuccess , getFlightById } from '../../../actions/flights'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Loading from 'react-loading-spinner';

class FlightComponent extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			openDeleteModal : false,
			showFlightUpdateModal : false,
			flightNumber : this.props.currentFlightToUpdate.flightNumber ,
			airline : this.props.currentFlightToUpdate.airline ,
			source : this.props.currentFlightToUpdate.source ,
			destination : this.props.currentFlightToUpdate.destination,
			arrival : this.props.currentFlightToUpdate.arrival ,
			departure : this.props.currentFlightToUpdate.departure,
			serviceStartDate : this.props.currentFlightToUpdate.serviceStartDate,
			serviceEndDate : this.props.currentFlightToUpdate.serviceEndDate,
			class : this.props.currentFlightToUpdate.class,
			price : this.props.currentFlightToUpdate.price,
			seats : this.props.currentFlightToUpdate.seats,
			_id : '' ,
			updateFlightError : '' ,
			flightUpdateLoading : false , 
			serviceStartDate : '' ,
			serviceEndDate : '',
			createdDate : '' ,
			updatedDate : ''
		}
	}


	componentWillReceiveProps(newProps) { 
	
	  this.setState({
	  		flightNumber : this.newProps.currentFlightToUpdate.flightNumber ,
	  	    airline : this.newProps.currentFlightToUpdate.airline ,
	  	    source : this.newProps.currentFlightToUpdate.source ,
	  	    destination : this.newProps.currentFlightToUpdate.destination ,
	  	    arrival : this.newProps.currentFlightToUpdate.arrival ,
	  	    departure : this.newProps.currentFlightToUpdate.departure ,
	  	    serviceStartDate : this.newProps.currentFlightToUpdate.serviceStartDate ,
	  	    serviceEndDate : this.newProps.currentFlightToUpdate.serviceEndDate ,
	  	    class : this.newProps.currentFlightToUpdate.class ,
	  	    price : this.newProps.currentFlightToUpdate.price ,
	  	    seats : this.newProps.currentFlightToUpdate.seats ,
			_id : newProps.currentFlightToUpdate._id,
			createdDate : newProps.currentFlightToUpdate.createdDate ,
			updatedDate : newProps.currentFlightToUpdate.updatedDate 
	  })


      if(newProps.flightUpdateSuccess != null && newProps.flightUpdateSuccess){
      	
      	this.setState({flightUpdateLoading : false , showFlightUpdateModal : false}) ;

      	//setBack success for carAddSuccess
      	this.props.setBackFlightUpdateSuccess();
      }
   }

	render() {
		 
		return (
    		<div className="singleFlightComponent">
				<div className="row mainRowDiv">
					<div className="col-md-9 col-sm-9 col-lg-9 col-xs-9 dataDiv">
						<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
							{this.props.flight.airline}
						</div>
						<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
							{this.props.flight.source}
						</div>
						<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
							{this.props.flight.departure}
						</div>
						<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
							{this.props.flight.destination}
						</div>
						<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
							{this.props.flight.arrival}
						</div>
						<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
							{this.props.flight.class}
						</div>
						<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
							{this.props.flight.price}
						</div>

					</div>
					<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3 buttonGroup ">

						
						<a><i className="fa fa-pencil-square-o fa-2x updateFontAwesome" aria-hidden="true" onClick={() => {
							this.props.getFlightById(this.props.flight._id)
							this.setState({
								showFlightUpdateModal : true
							})
						}}></i></a>
						
						<a className="redIcon"><i className="fa fa-times fa-2x" aria-hidden="true" onClick={() => {
							this.setState({
								openDeleteModal : true
							})
						}}></i></a>
						
					</div>

				</div>

				 <Modal show={this.state.showFlightModal} id="flightModal" className="flightModal">	
					<Modal.Body className="flightModalBody">
					    <div className="scrollDiv">
					      
					     	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="flightid">Flight Number</label>
					      		<input value={this.state.flightNumber} className="form-control sharpCorner" id="flightid" type="number"  onChange={(e) => {
					      			this.setState({
					      				flightNumber : e.target.value
					      			})
					      		}} aria-describedby="basic-addon1"   />
					      	</div>
					      	
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="airline">Airline Name</label>
					      		<input value={this.state.airline} className="form-control sharpCorner" id="airline" type="number"  onChange={(e) => {
					      			this.setState({
					      				airline : e.target.value
					      			})
					      		}} aria-describedby="basic-addon1"   />
					      	</div>
					      	
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="source">Source</label>
					      		<input value={this.state.source} className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				source : e.target.value
					      			})
					      		}} id="source" type="text"  aria-describedby="basic-addon1"   />
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="destination">Destination</label>
					      		<input value={this.state.destination} className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				destination : e.target.value
					      			})
					      		}} id="destination" type="text"  aria-describedby="basic-addon1"   />
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="arrival">Arrival</label>
					      		<input value={this.state.arrival} className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				arrival : e.target.value
					      			})
					      		}} id="arrival" type="time"  aria-describedby="basic-addon1"   />
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="departure">Departure</label>
					      		<input value={this.state.departure} className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				departure : e.target.value
					      			})
					      		}} id="departure" type="time"  aria-describedby="basic-addon1"   />
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="serviceStartDate">Flight Service Start Date</label>
					      		<input value={this.state.serviceStartDate} className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				serviceStartDate : e.target.value
					      			})
					      		}} id="serviceStartDate" type="date"  aria-describedby="basic-addon1"   />
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="flightAddTill">Flight Service End Date</label>
					      		<input value={this.state.serviceEndDate} className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				flightAddTill : e.target.value
					      			})
					      		}} id="flightAddTill" type="date"  aria-describedby="basic-addon1"   />
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="class">Class</label>
					      		<select value={this.state.class} onChange={(e) => {
							                              this.setState({
							                                class : e.target.value
							                              })
							                            }}className="form-control selectpicker" id="class">
			                      <option  className="selected disabled hidden">Select Class</option>
			                      <optgroup label="Class">
			                        <option>Business</option>
			                        <option>First</option>
			                        <option>Economy</option>
			                      </optgroup>
			                      
			                      
			                  </select>
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="seats">Number of Seats</label>
					      		<input value={this.state.seats} className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				seats : e.target.value
					      			})
					      		}} id="seats" type="text"  aria-describedby="basic-addon1"   />
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="price">Price</label>
					      		<input value={this.state.price} className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				price : e.target.value
					      			})
					      		}} id="price" type="text"  placeholder="$$" aria-describedby="basic-addon1"   />
					      	</div>
					      	
					     </div>   
					      
					   </Modal.Body>
					   <Modal.Footer className="flightModalFooter">
                               	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
						      		<div className="col-sm-5 col-lg-5 col-md-5 pull-right  text-right">
						      			<Loading isLoading={this.state.flightUpdateLoading} ></Loading>
						      		</div>
						      	</div>


                               	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2 flightAddErrorText">
					      			{this.state.updateFlightError} 
					      			
					      		</div>


						        <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
						      		
						      		<div className="col-sm-3 col-lg-3 col-md-3 pull-right  text-right">
						      			<button type="button" className="btn btn-default sharpCornerForInfoButton" onClick={() => {
						      				this.setState({showFlightUpdateModal : false})
						      			}}>Close</button>
						      		</div>
						      		<div className="col-sm-9 col-lg-9 col-md-9 pull-right  text-right">

						      			<button type="button" className="btn btn-info sharpCornerForInfoButton" onClick={() => {
											var startDate = new Date(this.state.serviceStartDate);
						      				startDate.setDate(startDate.getDate() + 1);
						      				var endDate = new Date(this.state.serviceEndDate);
						      				endDate.setDate(endDate.getDate() + 1);
						      				console.log("Dates selected " , startDate , endDate) ;
						      				
						      				if(this.state.flightNumber === '' ){
						      					this.setState({ updateFlightError : "Please Specify Flight Number"})
						      					return ;
						      				}
						      				if(this.state.airline === '' ){
						      					this.setState({ updateFlightError : "Please Specify Airline Name"})
						      					return ;
						      				}
						      				if(this.state.source === '' ){
						      					this.setState({ updateFlightError : "Please Specify Source Location"})
						      					return ;
						      				}
						      				if(this.state.destination === '' ){
						      					this.setState({ updateFlightError : "Please Specify Destination"})
						      					return ;
						      				}
						      				if(this.state.arrival === '' ){
						      					this.setState({ updateFlightError : "Please Specify Arrival Time"})
						      					return ;
						      				}
						      				if(this.state.departure === '' ){
						      					this.setState({ updateFlightError : "Please Specify Departure Time"})
						      					return ;
						      				}
						      				if(this.state.serviceStartDate === '' ){
						      					this.setState({ updateFlightError : "Please Specify Date from which service will start"})
						      					return ;
						      				}
						      				if(this.state.flightAddTill === '' ){
						      					this.setState({ updateFlightError : "Please Specify Date on which service will end"})
						      					return ;
						      				}
						      				if(this.state.class === '' ){
						      					this.setState({ updateFlightError : "Please Specify Class"})
						      					return ;
						      				}
						      				if(this.state.seats === '' ){
						      					this.setState({ updateFlightError : "Please Specify Seating Capacity"})
						      					return ;
						      				}
						      				if(this.state.price === '' ){
						      					this.setState({ updateFlightError : "Please Specify Price"})
						      					return ;
						      				}
										if(endDate <= startDate){

						      					this.setState({ updateCarError : "Service End Date should be a greater than start date"})
						      					return	
						      				}
						      				if(endDate <= startDate.setDate(startDate.getDate() + 14)){
						      					this.setState({ updateCarError : "Service provided should not be less than 15 days"})
						      					return ;
						      				}
						      				
						      				var obj = {
						      					flightNumber : this.state.flightNumber ,
												airline : this.state.airline ,
												source : this.state.source ,
												destination : this.state.destination,
												arrival : this.state.arrival ,
												departure : this.state.departure,
												serviceStartDate : this.state.serviceStartDate ,
												serviceEndDate : this.state.serviceEndDate ,
												class : this.state.class ,
												seats : this.state.seats,
												price : this.state.price
						      				}
						      				this.setState({ updateFlightError : '' , 
						      								flightAddLoading : true
						      								

						      							})
											this.props.addFlight(obj)
						      			}} >Submit 
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
    deleteFlightById : (id) => dispatch(deleteFlightById(id)) ,
   	updateFlightById: (obj) => dispatch(updateFlightById(obj)) ,
   	setBackFlightUpdateSuccess : () => dispatch(setBackFlightUpdateSuccess()) ,
   	getFlightById : (id) => dispatch(getFlightById(id))
  };
}

function mapStateToProps(state) {
    return {
        listOfFlights : state.carsReducer.allFlights , 
        flightAddSuccess : state.flightsReducer.flightAddSuccess,
        flightUpdateSuccess : state.flightsReducer.flightUpdateSuccess,
        currentFlightToUpdate : state.flightsReducer.currentFlightToUpdate
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <FlightComponent {...props}/>));
