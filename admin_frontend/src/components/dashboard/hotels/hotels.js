import React, { Component } from 'react';
import './hotels.css';
import {addHotel , getAllHotels } from '../../../actions/hotels';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import HotelComponent  from './hotelComponent';
import Autocomplete from 'react-autocomplete';
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
	        amenities : [],
            citySearch:''
		}

		this.amenitiesChanged = this.amenitiesChanged.bind(this) ; 

	}

    handleCityChange(val,item){
        this.setState({
            citySearch:item.city+', '+item.state,
            hotelCity:item.city+', '+item.state
        });
    }

    handleCitySearchChange(e,val){
        this.setState({
            citySearch: val,
            hotelCity:''
        });
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
            amenities : [],
            citySearch:''
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
        var options = this.props.cities;
		return (
    		<div className="row module-content">
				<div className="col-lg-12 col-sm-12 col-md-12 text-right">
					<button className="btn btn-primary btn-kayak" onClick={() => {
                        this.setState({showHotelModal : true})
                    }}>Add Hotel</button>
				</div>
				 <Modal show={this.state.showHotelModal} onHide={this.closeHotelModal} id="hotelModal">
					<Modal.Body>
					      	<div className="form-group col-xs-offset-2 col-xs-8">
					      		<label htmlFor="hotelname">Hotel Name</label>
					      		<input className="form-control" onChange={(e) => {
					      			this.setState({
					      				hotelName : e.target.value
					      			})
					      		}} id="hotelname" type="text"  aria-describedby="basic-addon1"   />
					      	</div>
					      	<div className="form-group col-xs-offset-2 col-xs-8">
					      		<label htmlFor="hoteladdress">Address</label>
					      		<input className="form-control" onChange={(e) => {
					      			this.setState({
					      				hotelAddress : e.target.value
					      			})
					      		}} id="hoteladdress" type="text"  aria-describedby="basic-addon1"   />
					      	</div>
					      	<div className="form-group col-xs-offset-2 col-xs-8">
					      		<label htmlFor="hotelCity">City</label>
					      		<Autocomplete
                                    inputProps={{ className: 'form-control'}}
                                    wrapperProps={{ className:'react-autocomplete' }}
                                    wrapperStyle={{ position: 'relative', display: 'inline-block', width: '100%' }}
                                    shouldItemRender={(item, value) =>
                                        value.length > 0 ? (item.city+', '+item.state).toLowerCase().indexOf(value.toLowerCase()) > -1 : false
                                    }
                                    getItemValue={(item) => item.city+', '+item.state}
                                    items={options}
                                    renderItem={(item, isHighlighted) =>
                                        <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`} key={item.rank}>
                                            <p>{item.city}, {item.state}</p>
                                        </div>
                                    }
                                    value={this.state.citySearch}
                                    onChange={this.handleCitySearchChange.bind(this)}
                                    onSelect={this.handleCityChange.bind(this)}
                                    renderMenu={children => (
                                        <div className="menu">
                                            {children}
                                        </div>
                                    )}
                                    selectOnBlur={true}
                                />
					      	</div>
					      
					      	<div className="form-group col-xs-offset-2 col-xs-8">
                                <div className="row">
					      		<div className="col-md-6">
							      	<label htmlFor="hotelState">State</label>
						      		<input className="form-control" onChange={(e) => {
						      			this.setState({
						      				hotelState : e.target.value
						      			})
						      		}} id="hotelState" type="text"  aria-describedby="basic-addon1"   />
						        </div>
						      	<div className="col-md-6">
					      			<label htmlFor="hotelZip">Zip</label>
						      		<input className="form-control" onChange={(e) => {
						      			this.setState({
						      				hotelZip : e.target.value
						      			})
						      		}} id="hotelZip" type="text"  aria-describedby="basic-addon1"   />
						      	</div>
                                </div>
						    </div>

					      	<div className="form-group col-xs-offset-2 col-xs-8">
					      		<label htmlFor="hotelPhoneNumber">Phone Number</label>
					      		<input className="form-control" onChange={(e) => {
					      			this.setState({
					      				hotelPhoneNumber : e.target.value
					      			})
					      		}} id="hotelPhoneNumber" type="text"  aria-describedby="basic-addon1"   />
					      	</div>
					      	


					      	<div className="form-group col-xs-offset-2 col-xs-8">
					      		<label htmlFor="hotelEmail">Email</label>
					      		<input className="form-control" onChange={(e) => {
					      			this.setState({
					      				hotelEmail : e.target.value
					      			})
					      		}} id="hotelEmail" type="text"  aria-describedby="basic-addon1"   />
					      	</div>

					      	<div className="form-group col-xs-offset-2 col-xs-8">
					      		<label htmlFor="hotelEmail">Amenities</label>
					      		<CheckboxGroup
                                    name="amenities"
                                    value={this.state.amenities}
                                    onChange={this.amenitiesChanged} className="CheckboxGroup">
                                    <div className="row">
                                    	<div className="col-xs-4">
                                    		<label><Checkbox value="Pool"/> Pool</label>
                                    	</div>
                                    	<div className="col-xs-4">
                                    		<label><Checkbox value="Bar"/> Bar</label>
                                    	</div>
                                    	<div className="col-xs-4">
                                    		<label><Checkbox value="Jacuzzi"/> Jacuzzi</label>
                                    	</div>
                                    	<div className="col-xs-4">
                                    		<label><Checkbox value="Lunch"/> Lunch</label>
                                    	</div>
                                    	<div className="col-xs-4">
                                    		<label><Checkbox value="Dinner"/> Dinner</label>
                                    	</div>
                                    	<div className="col-xs-4">
                                    		<label><Checkbox value="Air-conditioner"/> A/C</label>
                                    	</div>
                                    	<div className="col-xs-4">
                                    		<label><Checkbox value="Parking"/> Parking</label>
                                    	</div>
                                    	<div className="col-xs-4">
                                    		<label><Checkbox value="Wifi"/> Wifi</label>
                                    	</div>
                                    	<div className="col-xs-4">
                                    		<label><Checkbox value="TV"/> TV</label>
                                    	</div>
                                    </div>
                                    
                                </CheckboxGroup>
					      	</div>



					      	<div className="form-group col-xs-offset-2 col-xs-8">
                                <div className="row">
					      	<div className="col-md-6">
					      		<label htmlFor="hotelStar">Star</label>
					      		<select value={this.state.hotelStar}  onChange={(e) => {
						      			this.setState({
						      				hotelStar : e.target.value
						      			})
									}} className="form-control" id="hotelStar">
									    <option className="selected disabled hidden">Select</option>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
								  </select>
								  </div>
								  <div className="col-md-6">
						      		<label htmlFor="hotelRating">Overall Rating</label>
						      		<select value={this.state.hotelRating}  onChange={(e) => {
						      			this.setState({
						      				hotelRating : e.target.value
						      			})
									}} className="form-control" id="hotelStar">
									    <option className="selected disabled hidden">Select</option>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
								   </select>
								   </div>
                                </div>
						    </div>
						    <div className="image-preview form-group col-xs-offset-2 col-xs-8">
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
					      	<div className="form-group col-xs-offset-2 col-xs-8">
					      		<label htmlFor="serviceAvailable">Service Start Date</label>
					      		<input className="form-control" id="serviceAvailable" type="date"  onChange={(e) => {
					      				this.setState({
					      					serviceStartDate : e.target.value
					      				})
					      		}} aria-describedby="basic-addon1"   />
					      	</div>
					      	<div className="form-group col-xs-offset-2  col-xs-8">
					      		<label htmlFor="serviceAvailable">Service End Date</label>
					      		<input className="form-control" id="serviceAvailable" type="date"  onChange={(e) => {
					      				this.setState({
					      					serviceEndDate : e.target.value
					      				})
					      		}} aria-describedby="basic-addon1"   />
					      	</div>
					      	<div className="form-group col-xs-offset-2  col-xs-8">
					      		
					      		<button type="button" className="btn btn-primary btn-kayak" onClick={() => {
					      			var tempRooms = this.state.hotelRooms;
					      			tempRooms.push({ roomType : "", priceTotal : 0, totalAvailable : 0, personPerRoom : 0});
				      				this.setState({hotelRooms : tempRooms})
				      			}}>Add More Room Categories</button>
					      	</div>

					      	{(this.state.hotelRooms && this.state.hotelRooms.length > 0) ? this.state.hotelRooms.map((eachHotel, index) => 
							    <div key={index}>
                                    <div className="form-group col-xs-offset-2 col-xs-8">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label htmlFor="roomType">Room Type</label>
                                                <select value={this.state.roomType}  onChange={(e) => {
                                                    var tempRooms = this.state.hotelRooms;
                                                    tempRooms[index].roomType = e.target.value;
                                                    this.setState({hotelRooms : tempRooms});
                                                }} className="form-control" id="roomType">
                                                    <option className="selected disabled hidden">Select</option>
                                                    <option>Standard</option>
                                                    <option>Premium</option>
                                                    <option>Conference</option>
                                                    <option>Honeymoon</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="personPerRoom">Max Person Per Room</label>
                                                <select value={this.state.personPerRoom}  onChange={(e) => {
                                                    var tempRooms = this.state.hotelRooms;
                                                    tempRooms[index].personPerRoom = e.target.value;
                                                    this.setState({hotelRooms : tempRooms});
                                                }} className="form-control" id="personPerRoom">
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
                                    </div>
                                    <div className="form-group col-xs-offset-2  col-xs-8">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label htmlFor="priceTotal">Rent For One Day</label>
                                                <input className="form-control" onChange={(e) => {
                                                    var tempRooms = this.state.hotelRooms;
                                                    tempRooms[index].priceTotal = e.target.value;
                                                    this.setState({hotelRooms : tempRooms});
                                                }} id="priceTotal" type="text"  aria-describedby="basic-addon1"   />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="totalAvailable">Total Room Available</label>
                                                <input className="form-control" onChange={(e) => {
                                                    var tempRooms = this.state.hotelRooms;
                                                    tempRooms[index].totalAvailable = e.target.value;
                                                    this.setState({hotelRooms : tempRooms});
                                                }} id="totalAvailable" type="text"  aria-describedby="basic-addon1"   />
                                            </div>
                                        </div>
                                    </div>
								</div>)
					      	: null }
					   </Modal.Body>
					   <Modal.Footer>
                               	<div className="form-group col-xs-offset-2 col-xs-8 text-right">
						      			<Loading isLoading={this.state.hotelAddLoading} ></Loading>
						      	</div>
                               	<div className="form-group col-xs-offset-2 col-xs-8 text-right error">
					      			{this.state.addHotelError} 					      			
					      		</div>
						        <div className="form-group col-xs-offset-2 col-xs-8 text-right">
                                    <button type="button" className="btn btn-default btn-kayak btn-kayak-default" onClick={() => {
                                        this.setState({showHotelModal : false})
                                    }}>Close</button>
                                    <button type="button" className="btn btn-primary btn-kayak" onClick={this.addHotelServer.bind(this)} >Submit
                                    </button>
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
		  hotelDeleteSuccess : state.hotelsReducer ? state.hotelsReducer.hotelDeleteSuccess : null,
        cities:state.citiesReducer.cities
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <Hotels {...props}/>));
