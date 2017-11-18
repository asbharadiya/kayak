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
			hotelQuantity : 0 ,
			hotelType : '' ,
			hotelName : '' ,
			occupancy : '',
			luggage : '' ,
			dailyRentalValue : false,
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
      	this.setState({hotelAddLoading : false , showHotelModal : false}) ;

      	//setBack successfor hotelAddSuccess
      	this.props.setBackHotelAddSuccess();
      }
   }


	render() {
		
		return (
    		<div className="row car-content">
				<div className="col-lg-12 col-sm-12 col-md-12 addButtonDiv text-right">
					<button className="btn btn-primary btn-kayak" onClick={() => {
                        this.setState({showHotelModal : true})
                    }}>Add Hotel</button>
				</div>
				
				 <Modal show={this.state.showHotelModal} onHide={this.closeHotelModal} id="carModal" className="carModal">	
					<Modal.Body className="carModalBody">
					    
					      
					     	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="hotelid">No of Hotels to add</label>
					      		<input className="form-control sharpCorner" id="hotelid" type="number"  onChange={(e) => {
					      			this.setState({
					      				hotelQuantity : e.target.value
					      			})
					      		}} aria-describedby="basic-addon1"   />
					      	</div>
					      	
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="hotelType">Hotel Type</label>
					      		<select onChange={(e) => {
							                              this.setState({
							                                hotelType : e.target.value
							                              })
							                            }} className="form-control selectpicker" id="hotelType">
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
					      		<label htmlFor="hotelname">Hotel Name</label>
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				hotelName : e.target.value
					      			})
					      		}} id="hotelname" type="text"  aria-describedby="basic-addon1"   />
					      	</div>
					      	
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="maxpeople">Occupancy</label>
					      		<select onChange={(e) => {
							                              this.setState({
							                                occupancy : e.target.value
							                              })
							                            }}className="form-control selectpicker" id="hotelType">
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
					      		<label htmlFor="luggage">Luggage</label>
					      		<div data-toggle="buttons">
						          <label onClick={() => {
						          	this.setState({ luggage : 'YES'  })
						          }}className="btn btn-default btn-circle btn-lg">       <input type="radio" name="q1" value="YES"  /><i className="glyphicon glyphicon-ok"></i></label>
						          <label onClick={() => {
						          	this.setState({ luggage : 'NO'  })
						          }}className="btn btn-default btn-circle btn-lg">       <input type="radio" name="q1" value="NO" /><i className="glyphicon glyphicon-remove"></i></label>
						        </div>
					      	</div>
					      	
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="hotelname">Daily Rental Value</label>
					      		<span className="input-group-addon"><i ><b>$$$</b></i></span>
								<input type="number" onChange={(e) => {
							                              this.setState({
							                                dailyRentalValue : e.target.value
							                              })
							                            }} className="form-control"  aria-describedby="basic-addon1" required />
					      	</div>
					      	
					        
					      
					   </Modal.Body>
					   <Modal.Footer className="carModalFooter">
                               	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
						      		<div className="col-sm-5 col-lg-5 col-md-5 pull-right  text-right">
						      			<Loading isLoading={this.state.hotelAddLoading} ></Loading>
						      		</div>
						      	</div>


                               	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2 carAddErrorText">
					      			{this.state.addHotelError} 
					      			
					      		</div>


						        <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
						      		
						      		<div className="col-sm-3 col-lg-3 col-md-3 pull-right  text-right">
						      			<button type="button" className="btn btn-default" onClick={() => {
						      				this.setState({showHotelModal : false})
						      			}}>Close</button>
						      		</div>
						      		<div className="col-sm-9 col-lg-9 col-md-9 pull-right  text-right">

						      			<button type="button" className="btn btn-info" onClick={() => {
						      				
						      				if(this.state.hotelQuantity === 0 ){
						      					this.setState({ addHotelError : "Specify number of hotels to add"})
						      					return ;
						      				}
						      				if(this.state.hotelType === '' ){
						      					this.setState({ addHotelError : "Please select Hotel Type"})
						      					return ;
						      				}
						      				if(this.state.hotelName === '' ){
						      					this.setState({ addHotelError : "Please enter Hotel Name"})
						      					return ;
						      				}
						      				if(this.state.occupancy === '' ){
						      					this.setState({ addHotelError : "Please select number of occupants"})
						      					return ;
						      				}
						      				if(this.state.luggage === '' ){
						      					this.setState({ addHotelError : "Please specify luggage is allowed or not"})
						      					return ;
						      				}
						      				if(this.state.dailyRentalValue === false ){
						      					this.setState({ addHotelError : "Please specify daily rental value for the hotel"})
						      					return ;
						      				}
						      				var obj = {
						      					hotelQuantity : this.state.hotelQuantity ,
												hotelType : this.state.hotelType ,
												hotelName : this.state.hotelName ,
												occupancy : this.state.occupancy,
												luggage : this.state.luggage ,
												dailyRentalValue : this.state.dailyRentalValue
						      				}
						      				this.setState({ addHotelError : '' , hotelAddLoading : true})


						      				this.props.addHotel(obj)
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
								 <b>Hotel Name</b>
							 </div>
							 <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
								 <b>Type</b>
							 </div>
							 <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
								 <b># of Hotels</b>
							 </div>
							 <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
								 <b>Rental Value</b>
							 </div>
						 </div>

					 </div>


					{
						this.props.listOfHotels.map((hotel , key) => {
							return <HotelComponent hotel={hotel}  key={key}> </HotelComponent>
						})
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
