import React, { Component } from 'react';
import './hotelComponent.css'
import { Modal } from 'react-bootstrap';
import { deleteHotelById , updateHotelById , getHotelById } from '../../../actions/hotels'
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
			serviceStartDate : this.props.currentHotelToUpdate.serviceStartDate,
			serviceEndDate : this.props.currentHotelToUpdate.serviceEndDate,
			hotelRooms: this.props.currentHotelToUpdate.hotelRooms,
			_id : this.props.currentHotelToUpdate._id,
			updateHotelError : '' ,
			hotelUpdateLoading : false , 
			createdDate : '' ,
			updatedDate : '',
            filename : '' , 
            hotelFile : ''
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
			hotelRooms: newProps.currentHotelToUpdate.hotelRooms,
			_id : newProps.currentHotelToUpdate._id,
			createdDate : newProps.currentHotelToUpdate.createdDate ,
			updatedDate : newProps.currentHotelToUpdate.updatedDate 
	  });
	  if( (newProps.hotelDeleteSuccess != null && newProps.hotelDeleteSuccess) ) {
     	 this.setState({
              showHotelUpdateModal : false , 
              updateHotelError : ''
          })
     }
     if(newProps.hotelUpdateSuccess != null && newProps.hotelUpdateSuccess){
         this.setState({
             hotelUpdateLoading : false ,
             showHotelUpdateModal : false ,
             updateHotelError : ''
         }) ;
     }
     if(newProps.hotelUpdateSuccess === false){
         this.setState({
             hotelUpdateLoading : false ,
             updateHotelError : 'Error occured while updating the hotel record'
         }) ;
     }
   }

	render() {
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
							this.props.getHotelById(this.props.hotel._id);
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
			      		<input value={this.state.hotelName} className="form-control sharpCorner" onChange={(e) => {
			      			this.setState({
			      				hotelName : e.target.value
			      			})
			      		}} id="hotelname" type="text"  aria-describedby="basic-addon1"   />
			      	</div>
			      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
			      		<label htmlFor="hoteladdress">Address</label>
			      		<input value={this.state.hotelAddress} className="form-control sharpCorner" onChange={(e) => {
			      			this.setState({
			      				hotelAddress : e.target.value
			      			})
			      		}} id="hoteladdress" type="text"  aria-describedby="basic-addon1"   />
			      	</div>
			      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
			      		<label htmlFor="hotelCity">City</label>
			      		<input value={this.state.hotelCity} className="form-control sharpCorner" onChange={(e) => {
			      			this.setState({
			      				hotelCity : e.target.value
			      			})
			      		}} id="hotelCity" type="text"  aria-describedby="basic-addon1"   />
			      	</div>
			      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
			      		<div className="col-md-6 nopadding">
					      	<label htmlFor="hotelState">State</label>
				      		<input value={this.state.hotelState} className="form-control sharpCorner" onChange={(e) => {
				      			this.setState({
				      				hotelState : e.target.value
				      			})
				      		}} id="hotelState" type="text"  aria-describedby="basic-addon1"   />
				        </div>
				      	<div className="col-md-6 nopadding">	
			      			<label htmlFor="hotelZip">Zip</label>
				      		<input value={this.state.hotelZip} className="form-control sharpCorner" onChange={(e) => {
				      			this.setState({
				      				hotelZip : e.target.value
				      			})
				      		}} id="hotelZip" type="text"  aria-describedby="basic-addon1"   />
				      	</div>
				    </div>
			      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
			      		<label htmlFor="hotelPhoneNumber">Phone Number</label>
			      		<input value={this.state.hotelPhoneNumber} className="form-control sharpCorner" onChange={(e) => {
			      			this.setState({
			      				hotelPhoneNumber : e.target.value
			      			})
			      		}} id="hotelPhoneNumber" type="text"  aria-describedby="basic-addon1"   />
			      	</div>
			      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
			      		<label htmlFor="hotelEmail">Email</label>
			      		<input value={this.state.hotelEmail} className="form-control sharpCorner" onChange={(e) => {
			      			this.setState({
			      				hotelEmail : e.target.value
			      			})
			      		}} id="hotelEmail" type="text"  aria-describedby="basic-addon1"   />
			      	</div>
			      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
			      	<div className="col-md-6 nopadding">
			      		<label htmlFor="hotelStar">Star</label>
			      		<select value={this.state.hotelStar} value={this.state.hotelStar}  onChange={(e) => {
				      			this.setState({
				      				hotelStar : e.target.value
				      			})
							}} className="form-control selectpicker" id="hotelStar">
							    <option className="selected disabled hidden">Select</option>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
						  </select>
						  </div>
						  <div className="col-md-6 nopadding">
				      		<label htmlFor="hotelRating">Overall rating</label>
				      		<select value={this.state.hotelRating}  onChange={(e) => {
				      			this.setState({
				      				hotelRating : e.target.value
				      			})
							}} className="form-control selectpicker" id="hotelStar">
							    <option className="selected disabled hidden">Select</option>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
						   </select>
						   </div>
				    </div>
				    <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">
	                    <label htmlFor="carname">Upload</label>
	                    <div className="input-group image-preview">
	                        <input type="text" value={this.state.filename} className="form-control image-preview-filename" disabled="disabled" />
	                        <span className="input-group-btn">
                                {
                                    this.state.hotelFile === '' ?
                                        <span></span>
                                        :
                                        <button type="button"  onClick={() => {
                                            this.setState({hotelFile : '' , filename : ''})
                                        }} className="btn btn-default image-preview-clear" >
                                            <span className="glyphicon glyphicon-remove"></span> Clear
                                        </button>
                                }
	                            <div className="btn btn-default image-preview-input">
                                    <span className="glyphicon glyphicon-folder-open"></span>
                                    <span className="image-preview-input-title"></span> Browse
                                    <input type="file" onChange={(e) => {
                                        var file = e.target.files[0];
                                        if(file === undefined){
                                            return ;
                                        }
                                        this.setState({ hotelFile : file , filename : file.name})
                                    }} accept="image/png, image/jpeg, image/gif" name="input-file-preview"/>
	                            </div>
	                       </span>
	                    </div>
	                </div>
			      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
			      		<label htmlFor="serviceAvailable">Service Start Date</label>
			      		<input value={this.state.serviceStartDate ? this.state.serviceStartDate.substr(0,10) : this.state.serviceStartDate} className="form-control  sharpCorner" id="serviceAvailable" type="date"  onChange={(e) => {
			      				this.setState({
			      					serviceStartDate : e.target.value
			      				})
			      		}} aria-describedby="basic-addon1"   />
			      	</div>
			      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
			      		<label htmlFor="serviceAvailable">Service End Date</label>
			      		<input value={this.state.serviceEndDate ? this.state.serviceEndDate.substr(0,10) : this.state.serviceEndDate} className="form-control  sharpCorner" id="serviceAvailable" type="date"  onChange={(e) => {
			      				this.setState({
			      					serviceEndDate : e.target.value
			      				})
			      		}} aria-describedby="basic-addon1"   />
			      	</div>
			      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
			      		<label htmlFor="serviceAvailable">Rooms</label>
			      		<button type="button" className="btn btn-info btn-default sharpCornerForInfoButton pull-right" onClick={() => {
			      			var tempRooms = this.state.hotelRooms;
			      			tempRooms.push({ roomType : "", priceTotal : 0, totalAvailable : 0, personPerRoom : 0});
		      				this.setState({hotelRooms : tempRooms})
		      			}}>Add Room category</button>
			      	</div>
			      	{(this.state.hotelRooms && this.state.hotelRooms.length > 0) ? this.state.hotelRooms.map((eachHotel, index) => 
					    <div className="clearBoth">  	
			      			<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<div className="col-md-6 nopadding">
							      	<label htmlFor="roomType">Room Type</label>
							      	<select value={eachHotel.roomType}  onChange={(e) => {
							      		var tempRooms = this.state.hotelRooms;
							      		tempRooms[index].roomType = e.target.value;
					      				this.setState({hotelRooms : tempRooms});
										}} className="form-control selectpicker" id="roomType">
									    <option className="selected disabled hidden">Select</option>
										<option>Standard</option>
										<option>Premium</option>
										<option>Conference</option>
										<option>Honeymoon</option>
								  </select>
						        </div>
						      	<div className="col-md-6 nopadding">	
					      			<label htmlFor="personPerRoom">Max person per room</label>
					      			<select value={eachHotel.personPerRoom}  onChange={(e) => {
					      				var tempRooms = this.state.hotelRooms;
							      		tempRooms[index].personPerRoom = e.target.value;
					      				this.setState({hotelRooms : tempRooms});
										}} className="form-control selectpicker" id="personPerRoom">
									    <option className="selected disabled hidden">Select</option>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
								  </select>
						      	</div>
						    </div>
						    <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<div className="col-md-6 nopadding">
							      	<label htmlFor="priceTotal">Rent for one day</label>
						      		<input value={eachHotel.priceTotal} className="form-control sharpCorner" onChange={(e) => {
					      				var tempRooms = this.state.hotelRooms;
							      		tempRooms[index].priceTotal = e.target.value;
					      				this.setState({hotelRooms : tempRooms});
						      		}} id="priceTotal" type="text"  aria-describedby="basic-addon1"   />
						        </div>
						      	<div className="col-md-6 nopadding">	
					      			<label htmlFor="totalAvailable">Total Room Available</label>
						      		<input value={eachHotel.totalAvailable} className="form-control sharpCorner" onChange={(e) => {
					      				var tempRooms = this.state.hotelRooms;
							      		tempRooms[index].totalAvailable = e.target.value;
					      				this.setState({hotelRooms : tempRooms});
						      		}} id="totalAvailable" type="text"  aria-describedby="basic-addon1"   />
						      	</div>
						    </div>
						</div>)
			      	: null }
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
						      					this.setState({ updateHotelError : "Please enter hotel Name"})
						      					return ;
						      				}
						      				if(this.state.hotelAddress === '' ){
						      					this.setState({ updateHotelError : "Please enter hotel Address"})
						      					return ;
						      				}
						      				if(this.state.hotelCity === '' ){
						      					this.setState({ updateHotelError : "Please enter hotel City"})
						      					return ;
						      				}
						      				if(this.state.hotelState === '' ){
						      					this.setState({ updateHotelError : "Please enter hotel state"})
						      					return ;
						      				}
						      				if(this.state.hotelZip === '' || isNaN(this.state.hotelZip)){
						      					this.setState({ updateHotelError : "Please enter valid hotel zip"})
						      					return ;
						      				}
						      				if(this.state.hotelPhoneNumber === '' || isNaN(this.state.hotelPhoneNumber) || this.state.hotelPhoneNumber < 999999999){
						      					this.setState({ updateHotelError : "Please enter valid hotel phone number"})
						      					return ;
						      				}
						      				if(this.state.hotelEmail === '' || !(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(this.state.hotelEmail)){
						      					this.setState({ updateHotelError : "Please enter valid hotel email"})
						      					return ;
						      				}
						      				if(this.state.hotelStar === '' ){
						      					this.setState({ updateHotelError : "Please enter hotel star"})
						      					return ;
						      				}
						      				if(this.state.hotelRating === '' ){
						      					this.setState({ updateHotelError : "Please enter hotel rating"})
						      					return ;
						      				}
						      				if(this.state.serviceStartDate === ''){
						      					this.setState({ updateHotelError : "Please enter service start date"})
						      					return
						      				}						      				
						      				if(this.state.serviceEndDate === ''){
						      					this.setState({ updateHotelError : "Please enter service end date"})
						      					return
						      				}						      				
						      				if(!this.state.hotelRooms || this.state.hotelRooms.length===0 || this.state.hotelRooms[0].roomType===''){
						      					this.setState({ updateHotelError : "Please enter hotelRooms details correctly"})
						      					return
						      				}
						      				if(startDate <= new Date())	{
						      					this.setState({ updateHotelError : "Service Start Date should be a future date"})
						      					return
						      				}
						      				if(endDate <= new Date())	{
						      					this.setState({ updateHotelError : "Service End Date should be a future date"})
						      					return
						      				}
						      				if(endDate <= startDate){
						      					this.setState({ updateHotelError : "Service End Date should be a greater than start date"})
						      					return	
						      				}
						      				var obj = {
						      					_id : this.state._id,
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
												hotelRooms : this.state.hotelRooms
						      				}
											this.setState({ updateHotelError : '' , hotelUpdateLoading : true})

											this.props.updateHotelById(obj, this.props.hotel._id  , this.state.hotelFile);
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
   	updateHotelById: (obj, id , file) => dispatch(updateHotelById(obj , id , file )) ,
   	getHotelById : (id) => dispatch(getHotelById(id))
  };
}

function mapStateToProps(state) {
    return {
        hotelUpdateSuccess : state.hotelsReducer.hotelUpdateSuccess,
        currentHotelToUpdate : state.hotelsReducer.currentHotelToUpdate
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <HotelComponent {...props}/>));
