import React, { Component } from 'react';
import './carRowComponent.css';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

class CarRowComponent extends Component {

    render() {
        return (
            <div className="cars-row">
                <div className="info-section">
                    
                	
                	
                	<div className="divForImageAndName row">
	                	
	                		<div className="carName-category col-lg-7 col-md-7 col-sm-7 col-xs-7">
	                			
	                				<Rater total={5} rating={4} interactive={false}/>
	                			
	                			<div className="category-section">
			                		{this.props.car.carType}
			                	</div>
		                		<div>{this.props.car.carName} or Similar</div>
		                		<div className="excess-info-text">
		                			<span className="occupancy"><a><i className="fa fa-user fa-lg userFont" aria-hidden="true"></i></a>{this.props.car.occupancy}</span>
		                			<span className="luggage"><i className="fa fa-suitcase fa-lg suitcaseFont" aria-hidden="true"></i>{this.props.car.luggage}</span>
                					<span className="availableCars"><i className="fa fa-car fa-lg carFont" aria-hidden="true"></i>{this.props.car.carQuantity}</span>
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
					<p>${this.props.car.dailyRentalValue}</p>
					<button className="btn btn-primary btn-kayak">Book</button>
				</div>

            </div>
        );
    }
}

export default CarRowComponent;
