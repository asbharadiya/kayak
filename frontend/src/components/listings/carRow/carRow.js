import React, { Component } from 'react';
import './carRow.css';

class CarRow extends Component {

    render() {
        return (
            <div className="cars-row">
                <div className="info-section">
                    
                	
                	
                	<div className="divForImageAndName row">
	                	
	                		<div className="carName-category col-lg-7 col-md-7 col-sm-7 col-xs-7">
	                			<div className="category-section">
			                		Economy
			                	</div>
		                		<div>Hyundai Accent or Similar</div>
		                		<div className="excess-info-text">
		                			<span className="occupancy">10 People</span>
		                			<span className="luggage">Luggage Yes</span>
                					<span className="availableCars">Available Cars</span>
		                		</div>
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
					<p>$983</p>
					<button className="btn btn-primary btn-kayak">Book</button>
				</div>

            </div>
        );
    }
}

export default CarRow;
