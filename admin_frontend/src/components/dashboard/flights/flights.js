import React, { Component } from 'react';
import './flights.css';
import {addFlight  , getAllFlights } from '../../../actions/flights'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import FlightComponent  from './flightComponent'

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
			firstClassPrice : 0 , 
			businessClassPrice  : 0 ,
			economyClassPrice : 0 , 
			firstClassSeats : 0 ,
			businessClassSeats : 0,
			economyClassSeats : 0 ,


			addFlightError : "" ,
			showFlightModal: false,
			FlightAddLoading : false ,

			flightFile : '' ,
			filename : ''
		}

		this.openAddFlights = this.openAddFlights.bind(this) ; 
		this.closeAddFlight = this.closeAddFlight.bind(this) ; 
		this.addFlight = this.addFlight.bind(this) ; 
	}

	/*onChangeLuggage(e){
		this.setState({
			luggage : e.target.value
		})
	}*/

	componentDidMount(){
		this.props.getAllFlights()
	}

	componentWillReceiveProps(newProps) { 
	  
      if((newProps.flightAddSuccess != null && newProps.flightAddSuccess) ||
      	 (newProps.flightDeleteSuccess != null && newProps.flightDeleteSuccess) ||
      	 (newProps.flightUpdateSuccess != null && newProps.flightUpdateSuccess))
      {
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
						firstClassPrice : 0 , 
						businessClassPrice  : 0 ,
						economyClassPrice : 0 , 
						firstClassSeats : 0 ,
						businessClassSeats : 0,
						economyClassSeats : 0 ,

						addFlightError : '' ,
					}) ;
			
		this.props.getAllFlights()
      }

      if(newProps.flightAddSuccess === false){
            this.setState({
                addFlightError : 'Error occured while adding the car' ,
                flightAddLoading : false
            })
        }


   }




   openAddFlights(){
        this.setState({
          	flightNumber : '' ,
			airline : '' ,
			source : '' ,
			destination : '',
			arrival : '' ,
			departure : '',
			serviceStartDate : '',
			serviceEndDate : '',
			firstClassPrice : '' , 
			businessClassPrice  : '' ,
			economyClassPrice : '' , 
			firstClassSeats : '' ,
			businessClassSeats : '',
			economyClassSeats : '' ,

			addFlightError : '' ,
			showFlightModal: true,
			FlightAddLoading : false
        })
    }

    closeAddFlight(){
     	 this.setState({
          	showFlightModal: false,
		})  
	}


	addFlight(){
		var startDate = new Date(this.state.serviceStartDate);
		startDate.setDate(startDate.getDate() + 1);
		var endDate = new Date(this.state.serviceEndDate);
		endDate.setDate(endDate.getDate() + 1);
		console.log("Dates selected " , startDate , endDate) ;

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
		
		if(this.state.firstClassSeats == '' || this.state.businessClassSeats == '' || this.state.economyClassSeats == ''){
			this.setState({ addFlightError : 'Please check SEATS for flight' })
			return 
		}
		if(this.state.firstClassPrice == '' || this.state.businessClassPrice == '' || this.state.economyClassPrice == ''){
			this.setState({ addFlightError : 'Please check PRICES for Corresponsing Flights' })
			return 
		}
		if(startDate <= new Date())	{
			this.setState({ addFlightError : "Service Start Date should be a future date"})
			return
		}
		if(endDate <= new Date())	{
			this.setState({ addFlightError : "Service End Date should be a future date"})
			return
		}

		if(endDate <= startDate){

			this.setState({ addFlightError : "Service End Date should be a greater than start date"})
			return	
		}
		if(endDate <= startDate.setDate(startDate.getDate() + 14)){
			this.setState({ addFlightError : "Service provided should not be less than 15 days"})
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
			firstClassPrice :  this.state.firstClassPrice, 
			firstClassSeats : this.state.firstClassSeats, 
			businessClassPrice : this.state.businessClassPrice ,
			businessClassSeats : this.state.businessClassSeats, 
			economyClassPrice :  this.state.economyClassPrice,
			economyClassSeats : this.state.economyClassSeats
		
		}
		this.setState({ addFlightError : '' , 
						flightAddLoading : true})
		
		this.props.addFlight(obj , this.state.flightFile )
	}



	render() {
		
		return (
    		<div className="row flight-content">
				<div className="col-lg-12 col-sm-12 col-md-12 addButtonDiv text-right">
					<button className="btn btn-primary btn-kayak" onClick={this.openAddFlights}>Add Flight</button>
				</div>
				
				 <Modal show={this.state.showFlightModal} id="flightModal" className="flightModal">	
					<Modal.Body className="flightModalBody">
					    <div className="">
					      
					     	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="flightid">Flight Number</label>
					      		<input className="form-control sharpCorner" id="flightid" type="text"  onChange={(e) => {
																						      			this.setState({
																						      				flightNumber : e.target.value
																						      			})
																						      		}} aria-describedby="basic-addon1"   
								/>
					      	</div>
					      	
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="airline">Airline Name</label>
					      		<input className="form-control sharpCorner" id="airline" type="text"  onChange={(e) => {
																							      			this.setState({
																							      				airline : e.target.value
																							      			})
																							      		}} aria-describedby="basic-addon1"  
					      		 />
					      	</div>
					      	
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="source">Source</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
																			      			this.setState({
																			      				source : e.target.value
																			      			})
																			      		}} id="source" type="text"  aria-describedby="basic-addon1"   
					      		/>
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="destination">Destination</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
																				      			this.setState({
																				      				destination : e.target.value
																				      			})
																				      		}} id="destination" type="text"  aria-describedby="basic-addon1"  
					      		 />
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="arrival">Arrival</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
																				      			this.setState({
																				      				arrival : e.target.value
																				      			})
																				      		}} id="arrival" type="time"  aria-describedby="basic-addon1"  
					      		 />
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="departure">Departure</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
																				      			this.setState({
																				      				departure : e.target.value
																				      			})
																				      		}} id="departure" type="time"  aria-describedby="basic-addon1"   
					      		/>
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="serviceStartDate">Flight Service Start Date</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
																					      			this.setState({
																					      				serviceStartDate : e.target.value
																					      			})
																					      		}} id="serviceStartDate" type="date"  aria-describedby="basic-addon1"   
					      		/>
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="serviceEndDate">Flight Service End Date</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
																					      			this.setState({
																					      				serviceEndDate : e.target.value
																					      			})
																					      		}} id="serviceEndDate" type="date"  aria-describedby="basic-addon1"   
					      		/>
					      	</div>

					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="class"># Seats</label>

					      		<div className="row">
					      			<div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
					      				<input placeholder="First"  onChange={(e) => {
															      					this.setState({ firstClassSeats : e.target.value  })
															      				}}   className="form-control sharpCorner"id="serviceEndDate" type="number"  aria-describedby="basic-addon1"/>		
					      			</div>
					      			<div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
					      				<input placeholder="Business"   onChange={(e) => {
													      					this.setState({ businessClassSeats : e.target.value  })
													      				}}  className="form-control sharpCorner"id="serviceEndDate" type="number"  aria-describedby="basic-addon1"/>		
					      			</div>
					      			<div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
					      				<input placeholder="Economy"  onChange={(e) => {
																      					this.setState({ economyClassSeats : e.target.value  })
																      				}}  className="form-control sharpCorner"id="serviceEndDate" type="number"  aria-describedby="basic-addon1"/>		
					      			</div>
					      		</div>
					      		
					      	</div>

							<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="class">Price</label>

					      		<div className="row">
					      			<div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
					      				<input placeholder="First"  onChange={(e) => {
														      					this.setState({ firstClassPrice : e.target.value  })
														      				}}  className="form-control sharpCorner"id="serviceEndDate" type="number"  aria-describedby="basic-addon1"/>		
					      			</div>
					      			<div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
					      				<input placeholder="Business"  onChange={(e) => {
																	      					this.setState({ businessClassPrice : e.target.value  })
																	      				}}  className="form-control sharpCorner"id="serviceEndDate" type="number"  aria-describedby="basic-addon1"/>		
					      			</div>
					      			<div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
					      				<input placeholder="Economy"  onChange={(e) => {
																	      					this.setState({ economyClassPrice : e.target.value  })
																	      				}}  className="form-control sharpCorner"id="serviceEndDate" type="number"  aria-describedby="basic-addon1"/>		
					      			</div>
					      		</div>
					      	</div>


					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="carname">Upload</label>
	                            <div className="input-group image-preview">

	                                <input type="text" value={this.state.filename} className="form-control image-preview-filename" disabled="disabled" />
	                                <span className="input-group-btn">


							                	{
	                                                this.state.flightFile === '' ?
	                                                    <span></span>
	                                                    :
	                                                    <button type="button"  onClick={() => {
	                                                        this.setState({flightFile : '' , filename : ''})
	                                                    }} className="btn btn-default image-preview-clear" >
	                                                        <span className="glyphicon glyphicon-remove"></span> Clear
	                                                    </button>
	                                            }



	                                    <div className="btn btn-default image-preview-input">
							                        <span className="glyphicon glyphicon-folder-open"></span>
							                        <span className="image-preview-input-title"></span> Browse
							                        <input type="file" onChange={(e) => {
	                                                    var file = e.target.files[0];

	                                                    console.log("FIle " , file ) ;
	                                                    if(file === undefined){
	                                                        return ;
	                                                    }

	                                                    this.setState({ flightFile : file , filename : file.name})

	                                                }} accept="image/png, image/jpeg, image/gif" name="input-file-preview"/>
							                    </div>

							                </span>

	                            </div>
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
						      			<button type="button" className="btn btn-info btn-kayak " onClick={this.addFlight} >Submit </button>
						      		</div>
						      		<div className="col-sm-9 col-lg-9 col-md-9 pull-right  text-right">
											<button type="button" className="btn btn-default sharpCornerForInfoButton" onClick={this.closeAddFlight}>Close</button>
						      		</div>
						      	</div>

						      	


                          </Modal.Footer>
					 </Modal>


				 <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 divForHeaders">
					 <div className="row listHeader">

						 <div className="col-md-9 col-sm-9 col-lg-9 col-xs-9 dataDiv">
							 <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2">
								 <b>Flight Name</b>
							 </div>
							 <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2">
								 <b>Source</b>
							 </div>
							 <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2">
								 <b>Destination</b>
							 </div>
							 <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2">
								 <b>Departure</b>
							 </div>
							 <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2">
								 <b>Arrival</b>
							 </div>
						 </div>

					 </div>

					
					{
						this.props.listOfFlights.map((flight , key) => {
							return <FlightComponent flight={flight}  key={key}> </FlightComponent>
						})
					}
				</div>
			</div>
		
  	    );
	}
}


function mapDispatchToProps(dispatch) {
  return {
    addFlight : (params , flight) => dispatch(addFlight(params , flight)) ,
    getAllFlights : () => dispatch(getAllFlights()), 
		
  };
}

function mapStateToProps(state) {
    return {
        listOfFlights : state.flightsReducer.allFlights , 
        flightAddSuccess : state.flightsReducer.flightAddSuccess,	
	flightDeleteSuccess : state.flightsReducer.flightDeleteSuccess,
        flightUpdateSuccess : state.flightsReducer.flightUpdateSuccess
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <Flights {...props}/>));
