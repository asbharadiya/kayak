import React, { Component } from 'react';
import './flights.css';
import {addFlight , setBackFlightAddSuccess , getAllFlights } from '../../../actions/flights'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Modal } from 'react-bootstrap';
//import CarComponent  from './carComponent'

//Loading
import Loading from 'react-loading-spinner';


class Flights extends Component {

	constructor(props){
		super(props);
		this.state = {
			flightNumber : '' ,
			airline : '' ,
			source : '' ,
			destination : '',
			arrival : '' ,
			departure : '',
			serviceStartDate : '',
			serviceEndDate : '',
			class : '',
			price : '',
			seats : '',
			addFlightError : "" ,
			showFlightModal: false,
			FlightAddLoading : false
		}
	}

	/*onChangeLuggage(e){
		this.setState({
			luggage : e.target.value
		})
	}*/

	componentWillMount(){
		this.props.getAllFlights()
	}

	componentWillReceiveProps(newProps) {    
      if(newProps.flightAddSuccess != null && newProps.flightAddSuccess){
      	this.setState({flightAddLoading : false ,
      					showFlightModal : false,
      					flightNumber : '' ,
						airline : '' ,
						source : '' ,
						destination : '',
						arrival : '' ,
						departure : '',
						serviceStartDate : '' ,
						serviceEndDate : '',
						class : '',
						seats : '',
						price : ''}) ;

      	//setBack successfor carAddSuccess
      	this.props.setBackFlightAddSuccess();
      }
   }


	render() {
		return (
    		<div className="row flight-content">
				<div className="col-lg-12 col-sm-12 col-md-12 addButtonDiv text-right">
					<button className="btn btn-primary btn-kayak" onClick={() => {
                        this.setState({showFlightModal : true})
                    }}>Add Flight</button>
				</div>
				
				 <Modal show={this.state.showFlightModal} id="flightModal" className="flightModal">	
					<Modal.Body className="flightModalBody">
					    <div className="scrollDiv">
					      
					     	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="flightid">Flight Number</label>
					      		<input className="form-control sharpCorner" id="flightid" type="number"  onChange={(e) => {
					      			this.setState({
					      				flightNumber : e.target.value
					      			})
					      		}} aria-describedby="basic-addon1"   />
					      	</div>
					      	
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="airline">Airline Name</label>
					      		<input className="form-control sharpCorner" id="airline" type="number"  onChange={(e) => {
					      			this.setState({
					      				airline : e.target.value
					      			})
					      		}} aria-describedby="basic-addon1"   />
					      	</div>
					      	
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="source">Source</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				source : e.target.value
					      			})
					      		}} id="source" type="text"  aria-describedby="basic-addon1"   />
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="destination">Destination</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				destination : e.target.value
					      			})
					      		}} id="destination" type="text"  aria-describedby="basic-addon1"   />
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="arrival">Arrival</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				arrival : e.target.value
					      			})
					      		}} id="arrival" type="time"  aria-describedby="basic-addon1"   />
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="departure">Departure</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				departure : e.target.value
					      			})
					      		}} id="departure" type="time"  aria-describedby="basic-addon1"   />
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="serviceStartDate">Flight Service Start Date</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				serviceStartDate : e.target.value
					      			})
					      		}} id="serviceStartDate" type="date"  aria-describedby="basic-addon1"   />
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="serviceEndDate">Flight Service End Date</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				serviceEndDate : e.target.value
					      			})
					      		}} id="serviceEndDate" type="date"  aria-describedby="basic-addon1"   />
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="class">Class</label>
					      		<select onChange={(e) => {
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
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				seats : e.target.value
					      			})
					      		}} id="seats" type="text"  aria-describedby="basic-addon1"   />
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="price">Price</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
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
						      			<Loading isLoading={this.state.flightAddLoading} ></Loading>
						      		</div>
						      	</div>


                               	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2 flightAddErrorText">
					      			{this.state.addFlightError} 
					      			
					      		</div>


						        <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
						      		
						      		<div className="col-sm-3 col-lg-3 col-md-3 pull-right  text-right">
						      			<button type="button" className="btn btn-default sharpCornerForInfoButton" onClick={() => {
						      				this.setState({showFlightModal : false})
						      			}}>Close</button>
						      		</div>
						      		<div className="col-sm-9 col-lg-9 col-md-9 pull-right  text-right">

						      			<button type="button" className="btn btn-info sharpCornerForInfoButton" onClick={() => {
						      				
						      				if(this.state.flightNumber === '' ){
						      					this.setState({ addFlightError : "Please Specify Flight Number"})
						      					return ;
						      				}
						      				if(this.state.airline === '' ){
						      					this.setState({ addFlightError : "Please Specify Airline Name"})
						      					return ;
						      				}
						      				if(this.state.source === '' ){
						      					this.setState({ addFlightError : "Please Specify Source Location"})
						      					return ;
						      				}
						      				if(this.state.destination === '' ){
						      					this.setState({ addFlightError : "Please Specify Destination"})
						      					return ;
						      				}
						      				if(this.state.arrival === '' ){
						      					this.setState({ addFlightError : "Please Specify Arrival Time"})
						      					return ;
						      				}
						      				if(this.state.departure === '' ){
						      					this.setState({ addFlightError : "Please Specify Departure Time"})
						      					return ;
						      				}
						      				if(this.state.serviceStartDate === '' ){
						      					this.setState({ addFlightError : "Please Specify Date from which service will start"})
						      					return ;
						      				}
						      				if(this.state.serviceEndDate === '' ){
						      					this.setState({ addFlightError : "Please Specify Date on which service will end"})
						      					return ;
						      				}
						      				if(this.state.class === '' ){
						      					this.setState({ addFlightError : "Please Specify Class"})
						      					return ;
						      				}
						      				if(this.state.seats === '' ){
						      					this.setState({ addFlightError : "Please Specify Seating Capacity"})
						      					return ;
						      				}
						      				if(this.state.price === '' ){
						      					this.setState({ addFlightError : "Please Specify Price"})
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
												serviceEndDate : this.state.serviceEndDate,
												class : this.state.class ,
												seats : this.state.seats,
												price : this.state.price
						      				}
						      				this.setState({ addFlightError : '' , 
						      								flightAddLoading : true
						      								

						      							})
											this.props.addFlight(obj)
						      			}} >Submit 
						      			</button>
						      			
						      		</div>
						      	</div>

						      	


                          </Modal.Footer>
					 </Modal>


				 <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 divForHeaders">
					 <div className="row listHeader">

						 <div className="col-md-9 col-sm-9 col-lg-9 col-xs-9 dataDiv">
							 <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
								 <b>Flight Name</b>
							 </div>
							 <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
								 <b>Source & Departure</b>
							 </div>
							 <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
								 <b>Destination & Arrival</b>
							 </div>
							 <div className="col-md-1 col-sm-1 col-lg-1 col-xs-1">
								 <b>Class</b>
							 </div>
							 <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2">
								 <b>Cost</b>
							 </div>
						 </div>

					 </div>

					 //Add flightsComponent
					{
						this.props.listOfFlights.map((car , key) => {
							return <FlightComponent flight={flight}  key={key}> </CarComponent>
						})
					}
				</div>
			</div>
		
  	    );
	}
}


function mapDispatchToProps(dispatch) {
  return {
    addFlight : (params) => dispatch(addFlight(params)) ,
    setBackFlightAddSuccess : () => dispatch(setBackFlightAddSuccess()),
    getAllFlights : () => dispatch(getAllFlights()) 
  };
}

function mapStateToProps(state) {
    return {
        listOfFlights : state.flightsReducer.allFlights , 
        flightAddSuccess : state.carsReducer.flightAddSuccess
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <Flights {...props}/>));
