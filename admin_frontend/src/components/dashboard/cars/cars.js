import React, { Component } from 'react';
import './cars.css';
import {addCar} from '../../../actions/cars'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Cars extends Component {

	constructor(props){
		super(props);
		this.state = {
			carId : '' ,
			carType : '' ,
			carName : '' ,
			occupancy : '',
			luggage : '' ,
			dailyRentalValue : false
		}
	}

	onChangeLuggage(e){
		console.log("Change luggage called ")
		this.setState({
			luggage : e.target.value
		})
	}


	render() {
		if(this.props.listOfCars !== undefined){
			console.log("Total number of cars " , this.props.listOfCars.length)	
		}
		
		return (
    		<div className=" car-content"> 
				<div className="col-lg-12 col-sm-12 col-md-12 addButtonDiv">
					<div className="col-lg-10 col-sm-10 col-md-10">
					</div>
					<div className="col-lg-2 col-sm-2 col-md-2">
						<button className="btn btn-info " data-toggle="modal" data-target="#myModal">Add Car</button>
					</div>
				</div>
				
				
				
				<div id="myModal" className="modal fade" role="dialog">
				  <div className="modal-dialog">
				
				    
				    <div className="modal-content">
					      <div className="modal-header">
					        <button type="button" className="close" data-dismiss="modal">&times;</button>
					        <h4 className="modal-title">Enter car details to add </h4>
					      </div>
					      
					      <div className="modal-body">
					      
					      	
					      
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="carid">Car ID</label>
					      		<input className="form-control sharpCorner" id="carid" type="text"  onChange={(e) => {
					      			this.setState({
					      				carId : e.target.value
					      			})
					      		}} aria-describedby="basic-addon1"   />
					      	</div>
					      	
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="carType">Car Type</label>
					      		<select onChange={(e) => {
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
					      		<input className="form-control sharpCorner" onChange={(e) => {
					      			this.setState({
					      				carName : e.target.value
					      			})
					      		}} id="carname" type="text"  aria-describedby="basic-addon1"   />
					      	</div>
					      	
					      	<div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		<label htmlFor="maxpeople">Occupancy</label>
					      		<select onChange={(e) => {
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
					      		<label htmlFor="carname">Daily Rental Value</label>
					      		<span className="input-group-addon"><i ><b>$$$</b></i></span>
								<input type="text" onChange={(e) => {
							                              this.setState({
							                                dailyRentalValue : e.target.value
							                              })
							                            }} className="form-control"  aria-describedby="basic-addon1" required />
					      	</div>
					      	
					        
					      </div>
					      
					      <div className="modal-footer">
					        
					        <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
					      		
					      		<div className="col-sm-3 col-lg-3 col-md-3 pull-right  text-right">
					      			<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
					      		</div>
					      		<div className="col-sm-9 col-lg-9 col-md-9 pull-right  text-right">
					      			<button type="button" className="btn btn-default" onClick={() => {
					      				console.log(this.state)
					      				this.props.addCar(this.state)
					      			}} >Submit</button>
					      		</div>
					      	</div>
					        
					      </div>
					    </div>
					
					  </div>
					</div>
				


				<div className="col-lg-12 col-sm-12 col-md-12 addButtonDiv">
					<div className="col-lg-9 col-sm-9 col-md-9">
					</div>
					
				</div>
			</div>
		
  	    );
	}
}


function mapDispatchToProps(dispatch) {
  return {
    addCar : (params) => dispatch(addCar(params))
  };
}

function mapStateToProps(state) {
    return {
        listOfCars : state.carsReducer.allCars
        
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <Cars {...props}/>));
