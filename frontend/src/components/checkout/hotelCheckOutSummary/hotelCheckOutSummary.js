import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import './hotelCheckOutSummary.css';
import moment from 'moment';



class HotelCheckoutSummary extends Component {

	constructor(props){
		super(props) ;
		var checkInDate = moment(this.props.queryParams.checkInDate, 'MM-DD-YYYY');
		var checkOutDate = moment(this.props.queryParams.checkOutDate, 'MM-DD-YYYY');
		this.state = {
			baseFare : 0,
			tax : 0 ,
			totalDays: checkOutDate.diff(checkInDate,'days')+1,
			totalBaseFare : 0 ,
			total : 0
		}
	}

	componentDidMount(){
		{this.props.details.hotelRooms.map((room, key) => {
			if(room.roomType === this.props.queryParams.roomType) {
				this.setState({
					baseFare: room.priceTotal,
					totalBaseFare: this.state.totalDays * room.priceTotal,
					total: this.state.totalDays * room.priceTotal
				}, function() {
						// this.props.updateTotal(this.state.totalBaseFare);
					})
				}
			}
		)}
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
