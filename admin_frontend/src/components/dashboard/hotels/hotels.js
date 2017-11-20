import React, { Component } from 'react';
import './hotels.css';
import {addHotel , setBackHotelAddSuccess , getAllHotels } from '../../../actions/hotels'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import HotelComponent  from './hotelComponent'

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
			hotelAddLoading : false 
		}
	}

	onChangeLuggage(e){
		this.setState({
			luggage : e.target.value
		})
	}

	componentWillMount(){
		this.props.getAllHotels()
	}

	componentWillReceiveProps(newProps) {    
      if(newProps.hotelAddSuccess != null && newProps.hotelAddSuccess){
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
			serviceEndDate : ''
		});
      	//setBack successfor hotelAddSuccess
      	this.props.setBackHotelAddSuccess();      		
      }
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
					    <div className="scrollDiv">
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="hotelname">Hotel Name</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				hotelName : e.target.value
					      			})
					      		}} id="hotelname" type="text"  aria-describedby="basic-addon1"   />
					      	</div>
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="hoteladdress">Address</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				hotelAddress : e.target.value
					      			})
					      		}} id="hoteladdress" type="text"  aria-describedby="basic-addon1"   />
					      	</div>
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="hotelCity">City</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
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
					      	</div>
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="serviceAvailable">Service End Date</label>
					      		<input className="form-control  sharpCorner" id="serviceAvailable" type="date"  onChange={(e) => {
					      				this.setState({
					      					serviceEndDate : e.target.value
					      				})
					      		}} aria-describedby="basic-addon1"   />
					      	</div>					      	
					     </div>					      
					   </Modal.Body>
					   <Modal.Footer className="hotelModalFooter">
                               	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
						      		<div className="col-sm-5 col-lg-5 col-md-5 pull-right  text-right">
						      			<Loading isLoading={this.state.hotelAddLoading} ></Loading>
						      		</div>
						      	</div>
                               	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2 hotelAddErrorText">
					      			{this.state.addHotelError} 					      			
					      		</div>
						        <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">						      		
						      		<div className="col-sm-3 col-lg-3 col-md-3 pull-right  text-right">
						      			<button type="button" className="btn btn-default sharpCornerForInfoButton" onClick={() => {
						      				this.setState({showHotelModal : false})
						      			}}>Close</button>
						      		</div>
						      		<div className="col-sm-9 col-lg-9 col-md-9 pull-right  divForAddHotelConfirm text-right">
						      			<button type="button" className="btn btn-info sharpCornerForInfoButton" onClick={() => {
						      				var startDate = new Date(this.state.serviceStartDate);
						      				startDate.setDate(startDate.getDate() + 1);
						      				var endDate = new Date(this.state.serviceEndDate);
						      				endDate.setDate(endDate.getDate() + 1);
						      				if(this.state.hotelName === '' ){
						      					this.setState({ addHotelError : "Please enter Hotel Name"})
						      					return ;
						      				}
						      				if(this.state.hotelAddress === '' ){
						      					this.setState({ addHotelError : "Please enter Hotel Address"})
						      					return ;
						      				}
						      				if(this.state.hotelCity === '' ){
						      					this.setState({ addHotelError : "Please enter Hotel City"})
						      					return ;
						      				}
						      				if(this.state.hotelState === '' ){
						      					this.setState({ addHotelError : "Please enter Hotel Name"})
						      					return ;
						      				}
						      				if(this.state.hotelZip === '' ){
						      					this.setState({ addHotelError : "Please enter Hotel Name"})
						      					return ;
						      				}
						      				if(this.state.hotelPhoneNumber === '' ){
						      					this.setState({ addHotelError : "Please enter Hotel Name"})
						      					return ;
						      				}
						      				if(this.state.hotelEmail === '' ){
						      					this.setState({ addHotelError : "Please enter Hotel Name"})
						      					return ;
						      				}
						      				if(this.state.hotelStar === '' ){
						      					this.setState({ addHotelError : "Please enter Hotel Name"})
						      					return ;
						      				}
						      				if(this.state.hotelRating === '' ){
						      					this.setState({ addHotelError : "Please enter Hotel Name"})
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
												serviceEndDate : this.state.serviceEndDate
						      				}
						      				this.setState({
						      					addHotelError : '' , 
      											hotelAddLoading : true
						      				})
											this.props.addHotel(obj)
						      			}} >Submit 
						      			</button>						      			
						      		</div>
						      	</div>
                          </Modal.Footer>
					 </Modal>
				 <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 divForHeaders">
					 <div className="row listHeader">
						 <div className="col-md-10 col-sm-10 col-lg-10 col-xs-10 dataDiv">
							 <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
								 <b>Hotel Name</b>
							 </div>
							 <div className="col-md-4 col-sm-4 col-lg-4 col-xs-4">
								 <b>Address</b>
							 </div>
							 <div className="col-md-4 col-sm-4 col-lg-4 col-xs-4">
								 <b>Contact Info</b>
							 </div>
							 <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1">
								 <b>Rating</b>
							 </div>
						 </div>
					 </div>
					{
						this.props.listOfHotels ? this.props.listOfHotels.map((hotel , key) => {
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
    addHotel : (params) => dispatch(addHotel(params)) ,
    setBackHotelAddSuccess : () => dispatch(setBackHotelAddSuccess()),
    getAllHotels : () => dispatch(getAllHotels()) 
  };
}

function mapStateToProps(state) {
    return {
        listOfHotels : state.hotelsReducer.allHotels , 
        hotelAddSuccess : state.hotelsReducer.hotelAddSuccess
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <Hotels {...props}/>));