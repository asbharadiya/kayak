import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './carCheckoutSummary.css';



class CarCheckoutSummary extends Component {

	constructor(props){
		super(props) ;

		this.state = {
			baseFare : 0,
			tax : 0 ,
			totalDays : 0 ,
			totalBaseFare : 0 ,
			total : 0 

		}
	}

	componentDidMount(){
		var dailyRentalValue = this.props.details.dailyRentalValue;

		var serviceDays = ((new Date(this.props.queryParams.endDate)- new Date(this.props.queryParams.startDate))/(1000*60*60*24))+1 ;
		this.setState({
						totalDays : serviceDays ,
						baseFare : dailyRentalValue,
						totalBaseFare : serviceDays * dailyRentalValue,
						tax : Math.ceil(0.12 * (serviceDays * dailyRentalValue)),
					  } , function(){
					  	this.setState({total : (this.state.totalDays * this.state.baseFare) + this.state.tax}  , function(){
                        
                         this.props.updateTotal(this.state.total)
                        })
					  })
	}


	render() {
		
		return (
			<div className="car-checkout-summary">
                <div className="row summary-row">
                    <div className="col-xs-6">
                        <p className="label-text">Total Days</p>
                    </div>
                    <div className="col-xs-6 text-right">
                        <p className="value">{this.state.totalDays}</p>
                    </div>
                </div>
                <div className="row summary-row">
                    <div className="col-xs-6">
                        <p className="label-text">Vendor Base Fare</p>
                    </div>
                    <div className="col-xs-6 text-right">
                        <p className="value">${this.state.baseFare}</p>
                    </div>
                </div>
                <div className="row summary-row">
                    <div className="col-xs-6">
                        <p className="label-text">Total Base Fare</p>
                    </div>
                    <div className="col-xs-6 text-right">
                        <p className="value">${this.state.totalBaseFare}</p>
                    </div>
                </div>
                <div className="row summary-row">
                    <div className="col-xs-6">
                        <p className="label-text">Tax</p>
                    </div>
                    <div className="col-xs-6 text-right">
                        <p className="value">${this.state.tax}</p>
                    </div>
                </div>
                
                <div className="row summary-row total-row">
                    <div className="col-xs-6">
                        <p className="label-text">Total</p>
                    </div>
                    <div className="col-xs-6 text-right">
                        <p className="value">${this.state.total}</p>
                    </div>
                </div>
            </div>

		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default withRouter(connect(mapStateToProps)(props => <CarCheckoutSummary {...props}/>));