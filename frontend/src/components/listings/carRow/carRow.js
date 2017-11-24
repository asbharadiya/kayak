import React, { Component } from 'react';
import './carRow.css';
import 'react-rater/lib/react-rater.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { getAllCars } from '../../../actions/car';
import Rater from 'react-rater' ;
import './carRow.css';

class CarRow extends Component {

	
    render() {
    	return (
           <div>
           		 
           		{
           			this.props.allCars.length === 0 ? 
           			<h3>No Cars To Display</h3>
           			:

           			this.props.allCars.map((car , key) => {
           				return  <div className="cars-row" key={key}>
                              <div className="info-section">
                                  
                                
                                
                                <div className="divForImageAndName row">
                                  
                                    <div className="carName-category col-lg-7 col-md-7 col-sm-7 col-xs-7">
                                      
                                        <Rater total={5} rating={4} interactive={false}/>
                                      
                                      <div className="category-section">
                                        {car.carType}
                                      </div>
                                      <div>{car.carName} or Similar</div>
                                      <div className="excess-info-text">
                                        <span className="occupancy"><i className="fa fa-user fa-lg userFont" aria-hidden="true"></i>{car.occupancy}</span>
                                        <span className="luggage"><i className="fa fa-suitcase fa-lg suitcaseFont" aria-hidden="true"></i>{car.luggage}</span>
                                        <span className="availableCars"><i className="fa fa-car fa-lg carFont" aria-hidden="true"></i>{car.carQuantity}</span>
                                      </div>
                                      <hr></hr>
                                      <div className="specialRateButtonDiv">
                                        <button className="btn btn-default specialRateButton">Special Rate</button>
                                      </div>
                                    </div>
                                    <div className="carImageDiv col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                      <img className="carImage" src="/assets/images/hyundai.png"
                                        alt="Vehicle type: Economy - Hyundai Accent or similar"/>
                                    </div>
                                    
                        </div>
                      </div>
                              
                              <div className="price-section">
                        <p>${car.dailyRentalValue}</p>
                        <button className="btn btn-primary btn-kayak">Book</button>
                      </div>

                          </div>
           			})
           		}

           		
           </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
  return {
   getAllCars : () => dispatch(getAllCars())
  }
}

function mapStateToProps(state) {
    return {
       allCars : state.carsReducer.allCars
    }	
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <CarRow {...props}/>));
