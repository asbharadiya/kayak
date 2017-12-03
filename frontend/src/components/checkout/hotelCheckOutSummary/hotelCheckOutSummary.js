import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './hotelCheckOutSummary.css';

class HotelCheckoutSummary extends Component {

	constructor(props){
		super(props) ;

		this.state = {
			baseFare : 0,
			tax : 0 ,
			totalDays: 0,
			totalBaseFare : 0 ,
			total : 0
		}
	}

	componentDidMount(){
		var serviceDays = ((new Date(this.props.queryParams.endDate)- new Date(this.props.queryParams.startDate))/(1000*60*60*24))+1 ;
        this.props.details.hotelRooms.forEach(room => {
            if(room.roomType === this.props.queryParams.roomType) {
                this.setState({
					baseFare: room.priceTotal,
					totalBaseFare: serviceDays * room.priceTotal,
					total: serviceDays * room.priceTotal ,
                    totalDays : serviceDays
				}, function() {
						this.props.updateTotal(this.state.total);
					})
				}
			}
		)
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

export default withRouter(connect(mapStateToProps)(props => <HotelCheckoutSummary {...props}/>));
