import React, { Component } from 'react';
import './hotels.css';
import {addHotel , getAllHotels } from '../../../actions/hotels'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import HotelComponent  from './hotelComponent'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

//Loading
import Loading from 'react-loading-spinner';


class Hotels extends Component {

	constructor(props){
		super(props);
		this.state = {
			hotelName : '' ,
			hotelAddress : '',
			hotelCity : '',
			hotelState : '',
			hotelZip : '',
			hotelStar : '',
			hotelPhoneNumber : '',
			hotelEmail : '',
			hotelRating : '',
			serviceStartDate : '' ,
			serviceEndDate : '',
			addHotelError : "" ,
			showHotelModal: false,
			hotelAddLoading : false ,
			hotelRooms:[{ roomType : "", priceTotal : 0, totalAvailable : 0, personPerRoom : 0}],
	        hotelFile : '' ,
	        filename : '',
	        amenities : []
		}

		this.amenitiesChanged = this.amenitiesChanged.bind(this) ; 

	}

	amenitiesChanged(newAmentieis){
		this.setState({
            amenities: newAmentieis
        });
	}

	componentDidMount(){
		this.props.getAllHotels();
	}

	componentWillReceiveProps(newProps) {    
      if((newProps.hotelAddSuccess != null && newProps.hotelAddSuccess) ||
              (newProps.hotelDeleteSuccess != null && newProps.hotelDeleteSuccess) ||
              (newProps.hotelUpdateSuccess != null && newProps.hotelUpdateSuccess) ){
      	this.setState({hotelAddLoading : false ,
      		showHotelModal : false,
      		hotelName : '' ,
			hotelAddress : '',
			hotelCity : '',
			hotelState : '',
			hotelZip : '',
			hotelStar : '',
			hotelPhoneNumber : '',
			hotelEmail : '',
			hotelRating : '',
			serviceStartDate : '' ,
			serviceEndDate : '',
			hotelRooms:[{ roomType : "", priceTotal : 0, totalAvailable : 0, personPerRoom : 0}],
            hotelFile : '' ,
            filename : '',
            amenities : []
		});
      	this.props.getAllHotels();
      }
   }


   	addHotelServer(){
   		var startDate = new Date(this.state.serviceStartDate);
   		startDate.setDate(startDate.getDate() + 1);
   		var endDate = new Date(this.state.serviceEndDate);
   		endDate.setDate(endDate.getDate() + 1);
   		if(this.state.hotelName === '' ){
   			this.setState({ addHotelError : "Please enter hotel Name"})
   			return ;
   		}
   		if(this.state.hotelAddress === '' ){
   			this.setState({ addHotelError : "Please enter hotel Address"})
   			return ;
   		}
   		if(this.state.hotelCity === '' ){
   			this.setState({ addHotelError : "Please enter hotel City"})
   			return ;
   		}
   		if(this.state.hotelState === '' ){
   			this.setState({ addHotelError : "Please enter hotel state"})
   			return ;
   		}
   		if(this.state.hotelZip === '' || isNaN(this.state.hotelZip)){
   			this.setState({ addHotelError : "Please enter valid hotel zip"})
   			return ;
   		}
   		if(this.state.hotelPhoneNumber === '' || isNaN(this.state.hotelPhoneNumber) || this.state.hotelPhoneNumber < 999999999){
   			this.setState({ addHotelError : "Please enter valid hotel phone number"})
   			return ;
   		}
   		if(this.state.hotelEmail === '' || !(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(this.state.hotelEmail)){
   			this.setState({ addHotelError : "Please enter valid hotel email"})
   			return ;
   		}
   		if(this.state.hotelStar === '' ){
   			this.setState({ addHotelError : "Please enter hotel star"})
   			return ;
   		}
   		if(this.state.hotelRating === '' ){
   			this.setState({ addHotelError : "Please enter hotel rating"})
   			return ;
   		}
   		if(this.state.serviceStartDate === ''){
   			this.setState({ addHotelError : "Please enter service start date"})
   			return
   		}						      				
   		if(this.state.serviceEndDate === ''){
   			this.setState({ addHotelError : "Please enter service end date"})
   			return
   		}						      				
   		if(!this.state.hotelRooms || this.state.hotelRooms.length===0 || this.state.hotelRooms[0].roomType===''){
   			this.setState({ addHotelError : "Please enter hotelRooms details correctly"})
   			return
   		}
   		if(startDate <= new Date())	{
   			this.setState({ addHotelError : "Service Start Date should be a future date"})
   			return
   		}
   		if(endDate <= new Date())	{
   			this.setState({ addHotelError : "Service End Date should be a future date"})
   			return
   		}
   		if(endDate <= startDate){
   			this.setState({ addHotelError : "Service End Date should be a greater than start date"})
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
   			hotelRooms : this.state.hotelRooms,
   			amenities : this.state.amenities
   		}
   		this.setState({
   			addHotelError : '' , 
   			hotelAddLoading : true
   		})
   		this.props.addHotel(obj, this.state.hotelFile)
   	}

	render() {
		return (
    		<div className="row hotel-content">
				<div className="col-lg-12 col-sm-12 col-md-12 addButtonDiv text-right">
					<button className="btn btn-primary btn-kayak" onClick={() => {
                        this.setState({showHotelModal : true})
                    }}>Add Hotel</button>
				</div>
				 <Modal show={this.state.showHotelModal} onHide={this.closeHotelModal} id="hotelModal" className="hotelModal">	
					<Modal.Body className="hotelModalBody">
					    <div >
					      	<div className="form-group marginBottom15 col-xs-offset-2 col-xs-8 ignorePadd">
					      		<label htmlFor="hotelname">Hotel Name</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				hotelName : e.target.value
					      			})
					      		}} id="hotelname" type="text"  aria-describedby="basic-addon1"   />
					      	</div>
					      	<div className="form-group marginBottom15 col-xs-offset-2 col-xs-8 ignorePadd">
					      		<label htmlFor="hoteladdress">Address</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				hotelAddress : e.target.value
					      			})
					      		}} id="hoteladdress" type="text"  aria-describedby="basic-addon1"   />
					      	</div>
					      	<div className="form-group marginBottom15 col-xs-offset-2 col-xs-8 ignorePadd">
					      		<label htmlFor="hotelCity">City</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				hotelCity : e.target.value
					      			})
					      		}} id="hotelCity" type="text"  aria-describedby="basic-addon1"   />
					      	</div>
					      
					      	<div className="form-group marginBottom15 col-xs-offset-2 col-xs-8 ignorePadd">
					      		<div className="col-md-6 nopadding">
							      	<label htmlFor="hotelState">State</label>
						      		<input className="form-control sharpCorner" onChange={(e) => {
						      			this.setState({
						      				hotelState : e.target.value
						      			})
						      		}} id="hotelState" type="text"  aria-describedby="basic-addon1"   />
						        </div>
						      	<div className="col-md-6 nopadding">	
					      			<label htmlFor="hotelZip">Zip</label>
						      		<input className="form-control sharpCorner" onChange={(e) => {
						      			this.setState({
						      				hotelZip : e.target.value
						      			})
						      		}} id="hotelZip" type="text"  aria-describedby="basic-addon1"   />
						      	</div>
						    </div>

					      	<div className="form-group marginBottom15 col-xs-offset-2 col-xs-8 ignorePadd">
					      		<label htmlFor="hotelPhoneNumber">Phone Number</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				hotelPhoneNumber : e.target.value
					      			})
					      		}} id="hotelPhoneNumber" type="text"  aria-describedby="basic-addon1"   />
					      	</div>
					      	


					      	<div className="form-group marginBottom15 col-xs-offset-2 col-xs-8 ignorePadd">
					      		<label htmlFor="hotelEmail">Email</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				hotelEmail : e.target.value
					      			})
					      		}} id="hotelEmail" type="text"  aria-describedby="basic-addon1"   />
					      	</div>

					      	<div className="form-group marginBottom15 col-xs-offset-2 col-xs-8 ignorePadd">
					      		<label htmlFor="hotelEmail">Amenities</label>
					      		<CheckboxGroup
                                    name="amenities"
                                    value={this.state.amenities}
                                    onChange={this.amenitiesChanged} className="CheckboxGroup">
                                    <div className="row">
                                    	<div className="col-xs-4">
                                    		<label className="labelCheckBox"><Checkbox value="Pool"/> Pool</label>
                                    	</div>
                                    	<div className="div-check-box col-xs-4">
                                    		<label className="labelCheckBox"><Checkbox value="Bar"/> Bar</label>
                                    	</div>
                                    	<div className="div-check-box col-xs-4">
                                    		<label className="labelCheckBox"><Checkbox value="Jacuzzi"/> Jacuzzi</label>
                                    	</div>
                                    	<div className="col-xs-4">
                                    		<label className="labelCheckBox"><Checkbox value="Lunch"/> Lunch</label>
                                    	</div>
                                    	<div className="col-xs-4 div-check-box">
                                    		<label className="labelCheckBox"><Checkbox value="Dinner"/> Dinner</label>
                                    	</div>
                                    	<div className="col-xs-4 div-check-box">
                                    		<label className="labelCheckBox"><Checkbox value="Air-conditioner"/> A/C</label>
                                    	</div>
                                    	<div className="col-xs-4">
                                    		<label className="labelCheckBox"><Checkbox value="Parking"/> Parking</label>
                                    	</div>
                                    	<div className="col-xs-4 div-check-box">
                                    		<label className="labelCheckBox"><Checkbox value="Wifi"/> Wifi</label>
                                    	</div>
                                    	<div className="col-xs-4 div-check-box">
                                    		<label className="labelCheckBox"><Checkbox value="TV"/> TV</label>
                                    	</div>
                                    </div>
                                    
                                </CheckboxGroup>
					      	</div>



					      	<div className="form-group marginBottom15 col-xs-offset-2 col-xs-8 ignorePadd">
					      	<div className="col-md-6 nopadding">
					      		<label htmlFor="hotelStar">Star</label>
					      		<select value={this.state.hotelStar}  onChange={(e) => {
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
						    <div className="image-preview form-group col-xs-offset-2 col-xs-8 ignorePadd">
	                            <label htmlFor="hotelname">Upload</label>
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
					      	<div className="form-group marginBottom15 col-xs-offset-2 col-xs-8 ignorePadd">
					      		<label htmlFor="serviceAvailable">Service Start Date</label>
					      		<input className="form-control  sharpCorner" id="serviceAvailable" type="date"  onChange={(e) => {
					      				this.setState({
					      					serviceStartDate : e.target.value
					      				})
					      		}} aria-describedby="basic-addon1"   />
					      	</div>
					      	<div className="form-group marginBottom15 col-xs-offset-2  col-xs-8 ignorePadd">
					      		<label htmlFor="serviceAvailable">Service End Date</label>
					      		<input className="form-control  sharpCorner" id="serviceAvailable" type="date"  onChange={(e) => {
					      				this.setState({
					      					serviceEndDate : e.target.value
					      				})
					      		}} aria-describedby="basic-addon1"   />
					      	</div>
					      	<div className="room-category-button form-group marginBottom15 col-xs-offset-2  col-xs-8 ignorePadd">
					      		
					      		<button type="button" className="btn btn-info btn-default sharpCornerForInfoButton" onClick={() => {
					      			var tempRooms = this.state.hotelRooms;
					      			tempRooms.push({ roomType : "", priceTotal : 0, totalAvailable : 0, personPerRoom : 0});
				      				this.setState({hotelRooms : tempRooms})
				      			}}>Add More Room categories</button>
					      	</div>

					      	{(this.state.hotelRooms && this.state.hotelRooms.length > 0) ? this.state.hotelRooms.map((eachHotel, index) => 
							    <div className="clearBoth">  	
					      			<div className="form-group marginBottom15 col-xs-offset-2 col-xs-8 ignorePadd">
							      		<div className="col-md-6 nopadding">
									      	<label htmlFor="roomType">Room Type</label>
									      	<select value={this.state.roomType}  onChange={(e) => {
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
							      			<select value={this.state.personPerRoom}  onChange={(e) => {
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
								    <div className="form-group marginBottom15 col-xs-offset-2  col-xs-8 ignorePadd">
							      		<div className="col-md-6 nopadding">
									      	<label htmlFor="priceTotal">Rent for one day</label>
								      		<input className="form-control sharpCorner" onChange={(e) => {
							      				var tempRooms = this.state.hotelRooms;
									      		tempRooms[index].priceTotal = e.target.value;
							      				this.setState({hotelRooms : tempRooms});
								      		}} id="priceTotal" type="text"  aria-describedby="basic-addon1"   />
								        </div>
								      	<div className="col-md-6 nopadding">	
							      			<label htmlFor="totalAvailable">Total Room Available</label>
								      		<input className="form-control sharpCorner" onChange={(e) => {
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
                               	<div className="form-group marginBottom15 col-xs-offset-2 col-xs-8 ignorePadd">
						      		<div className="col-sm-5 pull-right  text-right">
						      			<Loading isLoading={this.state.hotelAddLoading} ></Loading>
						      		</div>
						      	</div>
                               	<div className="form-group marginBottom15 col-xs-offset-2 col-xs-8 ignorePadd hotelAddErrorText">
					      			{this.state.addHotelError} 					      			
					      		</div>
						        <div className="form-group marginBottom15 col-xs-offset-2 col-xs-8 ignorePadd">						      		
						      		<div className="col-sm-3  pull-right  text-right">
						      			<button type="button" className="btn btn-default btn-kayak" onClick={this.addHotelServer.bind(this)} >Submit 
						      			</button>

						      		</div>
						      		<div className="col-sm-9  pull-right  divForAddHotelConfirm ">
						      					<button type="button" className="btn btn-default sharpCornerForInfoButton" onClick={() => {
								      				this.setState({showHotelModal : false})
								      			}}>Close</button>				      			
						      		</div>
						      	</div>
                          </Modal.Footer>
					 </Modal>
				 <div className="col-xs-12 divForHeaders">
					 <div className="row listHeader">
						 <div className="col-xs-10 dataDiv">
							 <div className="col-xs-3">
								 <b>Hotel Name</b>
							 </div>
							 <div className="col-xs-4">
								 <b>Address</b>
							 </div>
							 <div className="col-xs-4">
								 <b>Contact Info</b>
							 </div>
							 <div className="col-xs-1">
								 <b>Rating</b>
							 </div>
						 </div>
					 </div>
					{
						(this.props.listOfHotels && this.props.listOfHotels.length>0) ? this.props.listOfHotels.map((hotel , key) => {
							return <HotelComponent hotel={hotel}  key={key}> </HotelComponent>
						}) : null
					}
				</div>
			</div>
  	    );
	}
}


function mapDispatchToProps(dispatch) {
  return {
    addHotel : (params, file) => dispatch(addHotel(params, file)) ,
    getAllHotels : () => dispatch(getAllHotels()) 
  };
}

function mapStateToProps(state) {
    return {
        listOfHotels : state.hotelsReducer ? state.hotelsReducer.allHotels : null, 
        hotelAddSuccess : state.hotelsReducer ? state.hotelsReducer.hotelAddSuccess : null,
		  hotelUpdateSuccess : state.hotelsReducer ? state.hotelsReducer.hotelUpdateSuccess : null,
		  hotelDeleteSuccess : state.hotelsReducer ? state.hotelsReducer.hotelDeleteSuccess : null
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <Hotels {...props}/>));
