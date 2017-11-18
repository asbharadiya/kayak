import React, { Component } from 'react';
import './carComponent.css'
import { Modal } from 'react-bootstrap';
import { deleteCarById , updateCarById , setBackCarUpdateSuccess , getCarById } from '../../../actions/cars'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Loading from 'react-loading-spinner';

class CarComponent extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			openDeleteModal : false,
			showCarUpdateModal : false,
			carQuantity : this.props.currentCarToUpdate.carQuantity ,
			carType : this.props.currentCarToUpdate.carType,
			carName : this.props.currentCarToUpdate.carName ,
			occupancy : this.props.currentCarToUpdate.occupancy,
			luggage : this.props.currentCarToUpdate.luggage ,
			dailyRentalValue : this.props.currentCarToUpdate.dailyRentalValue,
			_id : '' ,
			updateCarError : '' ,
			carUpdateLoading : false , 
			serviceStartDate : '' ,
			serviceEndDate : '',
			createdDate : '' ,
			updatedDate : ''
		}
	}


	componentWillReceiveProps(newProps) { 
	
	  this.setState({
	  	    carQuantity : newProps.currentCarToUpdate.carQuantity ,
			carType : newProps.currentCarToUpdate.carType,
			carName : newProps.currentCarToUpdate.carName ,
			occupancy : newProps.currentCarToUpdate.occupancy,
			luggage : newProps.currentCarToUpdate.luggage ,
			dailyRentalValue : newProps.currentCarToUpdate.dailyRentalValue,
			_id : newProps.currentCarToUpdate._id,
			serviceStartDate : newProps.currentCarToUpdate.serviceStartDate ,
			serviceEndDate : newProps.currentCarToUpdate.serviceEndDate ,
			createdDate : newProps.currentCarToUpdate.createdDate ,
			updatedDate : newProps.currentCarToUpdate.updatedDate 
	  })


      if(newProps.carUpdateSuccess != null && newProps.carUpdateSuccess){
      	
      	this.setState({carUpdateLoading : false , showCarUpdateModal : false}) ;

      	//setBack success for carAddSuccess
      	this.props.setBackCarUpdateSuccess();
      }
   }

	render() {
		console.log("Plash " , this.state) ; 
		return (
    		<div className="singleCarComponent">
				<div className="row mainRowDiv">
					<div className="col-md-9 col-sm-9 col-lg-9 col-xs-9 dataDiv">
						<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
							{this.props.car.carName}
						</div>
						<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
							{this.props.car.carType}
						</div>
						<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
							{this.props.car.carQuantity}
						</div>
						<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
							{this.props.car.dailyRentalValue}
						</div>

					</div>
					<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3 buttonGroup ">

						
						<a><i className="fa fa-pencil-square-o fa-2x updateFontAwesome" aria-hidden="true" onClick={() => {
							this.props.getCarById(this.props.car._id)
							this.setState({
								showCarUpdateModal : true
							})
						}}></i></a>
						
						<a className="redIcon"><i className="fa fa-times fa-2x" aria-hidden="true" onClick={() => {
							this.setState({
								openDeleteModal : true
							})
						}}></i></a>
						
					</div>

				</div>

				 <Modal show={this.state.openDeleteModal}  id="carModal" className="carModal">

					<Modal.Body className="carDeleteBody">
						<b>Are you sure to delete {this.props.car.carName } ?  </b>
					</Modal.Body>

					<Modal.Footer className="carDeleteFooter">
						 <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12">
							<div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-md-offset-4 col-xs-offset-4 col-lg-offset-4 col-sm-offset-4">
								<button className="btn btn-danger sharpCornerForInfoButton" onClick={() => {
									this.props.deleteCarById(this.props.car._id)
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

				<Modal show={this.state.showCarUpdateModal}  id="carModal" className="carModal">
					<Modal.Body className="carModalBody">

						<div className="scrollDiv">
							

							<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
								<label htmlFor="carType">Car Type</label>
								<select value={this.state.carType}  onChange={(e) => {
														  this.setState({
															carType : e.target.value
														  })
														}} className="form-control selectpicker" id="carType">
								  <option  className="selected disabled hidden">Select</option>
								  <optgroup label="All className">
									<option>Standard</option>
									<option>Premium</option>
									<option>Full Size</option>
									<option>Luxury</option>
								  </optgroup>
								  <optgroup label="SUV">
									<option>Compact SUV</option>
									<option>Standard SUV</option>
									<option>Intermediate SUV</option>
									<option>Full Size SUV</option>
								  </optgroup>

							  </select>
							</div>

							<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
								<label htmlFor="carname">Car Name</label>
								<input value={this.state.carName}  className="form-control sharpCorner" onChange={(e) => {
									this.setState({
										carName : e.target.value
									})
								}} id="carname" type="text"  aria-describedby="basic-addon1"   />
							</div>

							<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
								<label htmlFor="maxpeople">Occupancy</label>
								<select value={this.state.occupancy}  onChange={(e) => {
														  this.setState({
															occupancy : e.target.value
														  })
														}}className="form-control selectpicker" id="carType">
								  <option  className="selected disabled hidden">No of Occupants</option>
								  <optgroup label="No of occupants">
									<option>2</option>
									<option>4</option>
									<option>5</option>
									<option>7</option>
									<option>8</option>
								  </optgroup>


							  </select>
							</div>

							<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
								<label htmlFor="carid">No of Cars to add</label>
								<input className="form-control sharpCorner" value={this.state.carQuantity} id="carid" type="number"  onChange={(e) => {
									this.setState({
										carQuantity : e.target.value
									})
								}} aria-describedby="basic-addon1"   />
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



							<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
								<label htmlFor="luggage">Luggage</label>
								<div data-toggle="buttons">
								  <label onClick={() => {
									this.setState({ luggage : 'YES'  })
								  }}className="btn btn-primary btn-circle btn-md lable-margin">       <input type="radio" name="q1" value="YES"  /><i className="glyphicon glyphicon-ok"></i></label>
								  <label onClick={() => {
									this.setState({ luggage : 'NO'  })
								  }}className="btn btn-danger btn-circle btn-md">       <input type="radio" name="q1" value="NO" /><i className="glyphicon glyphicon-remove"></i></label>
								</div>
							</div>

							<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
								<label htmlFor="carname">Daily Rental Value</label>
								<input type="number" value={this.state.dailyRentalValue} onChange={(e) => {
														  this.setState({
															dailyRentalValue : e.target.value
														  })
														}} className="form-control"  aria-describedby="basic-addon1" required />
							</div>

						</div>

					   </Modal.Body>
					   <Modal.Footer className="carModalFooter">
								<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
									<div className="col-sm-5 col-lg-5 col-md-5 pull-right  text-right">
										<Loading isLoading={this.state.carUpdateLoading} ></Loading>
									</div>
								</div>

								<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2 carAddErrorText">
									{this.state.updateCarError}

								</div>


								<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">

									<div className="col-sm-3 col-lg-3 col-md-3 pull-right  text-right">
										<button type="button" className="btn btn-default sharpCornerForInfoButton" onClick={() => {
											this.setState({
												showCarUpdateModal : false
											})
											}}>Close</button>
									</div>
									<div className="col-sm-9 col-lg-9 col-md-9 pull-right  text-right">

										<button type="button" className="btn btn-info sharpCornerForInfoButton" onClick={() => {
											var startDate = new Date(this.state.serviceStartDate);
						      				startDate.setDate(startDate.getDate() + 1);
						      				var endDate = new Date(this.state.serviceEndDate);
						      				endDate.setDate(endDate.getDate() + 1);
						      				console.log("Dates selected " , startDate , endDate) ;

											
											if(this.state.carQuantity === '' ){
												this.setState({ updateCarError : "Specify number of cars to add"})
												return ;
											}
											if(this.state.carType === '' ){
												this.setState({ updateCarError : "Please select Car Type"})
												return ;
											}
											if(this.state.carName === '' ){
												this.setState({ updateCarError : "Please enter Car Name"})
												return ;
											}
											if(this.state.occupancy === '' ){
												this.setState({ updateCarError : "Please select number of occupants"})
												return ;
											}
											if(this.state.serviceStartDate === ''){
						      					this.setState({ updateCarError : "Please enter service start date"})
						      					return
						      				}
						      				
						      				if(this.state.serviceEndDate === ''){
						      					this.setState({ updateCarError : "Please enter service end date"})
						      					return
						      				}
						      				if(startDate <= new Date())	{
						      					this.setState({ updateCarError : "Service Start Date should be a future date"})
						      					return
						      				}
						      				if(endDate <= new Date())	{
						      					this.setState({ updateCarError : "Service End Date should be a future date"})
						      					return
						      				}

						      				if(endDate <= startDate){

						      					this.setState({ updateCarError : "Service End Date should be a greater than start date"})
						      					return	
						      				}
						      				if(endDate <= startDate.setDate(startDate.getDate() + 14)){
						      					this.setState({ updateCarError : "Service provided should not be less than 15 days"})
						      					return ;
						      				}
											if(this.state.luggage === '' ){
												this.setState({ updateCarError : "Please specify luggage is allowed or not"})
												return ;
											}
											if(this.state.dailyRentalValue === false ){
												this.setState({ updateCarError : "Please specify daily rental value for the car"})
												return ;
											}


											var obj = {
												carQuantity : this.state.carQuantity ,
												carType : this.state.carType ,
												carName : this.state.carName ,
												occupancy : this.state.occupancy,
												luggage : this.state.luggage ,
												dailyRentalValue : this.state.dailyRentalValue,
												is_deleted : false,
												_id  : this.state._id,
												serviceStartDate : this.state.serviceStartDate  ,
												serviceEndDate : this.state.serviceEndDate ,
												createdDate : this.state.createdDate ,
												updatedDate : this.state.updatedDate
											}
											this.setState({ updateCarError : '' , carUpdateLoading : true})

											this.props.updateCarById(obj)
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
    deleteCarById : (id) => dispatch(deleteCarById(id)) ,
   	updateCarById: (obj) => dispatch(updateCarById(obj)) ,
   	setBackCarUpdateSuccess : () => dispatch(setBackCarUpdateSuccess()) ,
   	getCarById : (id) => dispatch(getCarById(id))
  };
}

function mapStateToProps(state) {
    return {
        listOfCars : state.carsReducer.allCars , 
        carAddSuccess : state.carsReducer.carAddSuccess,
        carUpdateSuccess : state.carsReducer.carUpdateSuccess,
        currentCarToUpdate : state.carsReducer.currentCarToUpdate
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <CarComponent {...props}/>));
