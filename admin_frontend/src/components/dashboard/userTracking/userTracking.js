import React, { Component } from 'react';
import { Legend, Tooltip, XAxis, YAxis, CartesianGrid, BarChart, Bar, Label } from 'recharts';
import './userTracking.css';
import * as actions from '../../../actions/userTracking';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class UserTracking extends Component {

	constructor(props){
		super(props);
		let bars = [];
		for (var i = 0; i < 5; i++) {
			bars.push(<Bar dataKey={"Bookings-"+i+"-visit"} stackId="a" fill="#82ca9d" />);
			bars.push(<Bar dataKey={"Cars-"+i+"-visit"} stackId="a" fill="#f46b42" />);
			bars.push(<Bar dataKey={"Flights-"+i+"-visit"} stackId="a" fill="#8884d8" />);
			bars.push(<Bar dataKey={"Hotels-"+i+"-visit"} stackId="a" fill="#82ca9d" />);
			bars.push(<Bar dataKey={"Car-listing-"+i+"-visit"} stackId="a" fill="#f46b42" />);
			bars.push(<Bar dataKey={"Hotel-listing-"+i+"-visit"} stackId="a" fill="#82ca9d" />);
			bars.push(<Bar dataKey={"Flight-listing-"+i+"-visit"} stackId="a" fill="#8884d8" />);
			bars.push(<Bar dataKey={"Payment-methods-"+i+"-visit"} stackId="a" fill="#d641f4" />);
			bars.push(<Bar dataKey={"Home-"+i+"-visit"} stackId="a" fill="#f44176" />);
			bars.push(<Bar dataKey={"Profile-"+i+"-visit"} stackId="a" fill="#f4cd41" />);
			bars.push(<Bar dataKey={"Checkout-"+i+"-visit"} stackId="a" fill="#41d6f4" />);
	    }
		this.state = {
			bars : bars,
			userAnalyticsPageClicks : [],
			userAnalyticsListingViewCar : [],
			userAnalyticsListingViewHotel : [],
			userAnalyticsListingViewFlight : [],
			userActivityTracking : [],
			width : window.innerWidth-400
		}
	}

    componentDidMount(){
        this.props.getUserAnalytics();
    }

	render() {
		return (
    		<div className="userTrackingpage">
    		<div>
	            <div className="col-lg-4 col-md-6">
	                <div className="card">
	                    <div className="card-body">
	                        <div className="d-flex flex-row">
	                            <div className="round round-lg align-self-center round-info"><i className="fa fa-plane"></i></div>
	                            <div className="m-l-10 align-self-center">
	                                <h3 className="m-b-0 font-light">{this.props.userAnalyticsListingViewFlight.length>0 ? this.props.userAnalyticsListingViewFlight[0].name : null}</h3>
	                                <h5 className="text-muted m-b-0">Most Popular Airline</h5></div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div className="col-lg-4 col-md-6">
	                <div className="card">
	                    <div className="card-body">
	                        <div className="d-flex flex-row">
	                            <div className="round round-lg align-self-center round-warning"><i className="fa fa-bed"></i></div>
	                            <div className="m-l-10 align-self-center">
	                                <h3 className="m-b-0 font-lgiht">{this.props.userAnalyticsListingViewHotel.length>0 ? this.props.userAnalyticsListingViewHotel[0].name : null}</h3>
	                                <h5 className="text-muted m-b-0">Most Popular Hotel</h5></div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div className="col-lg-4 col-md-6">
	                <div className="card">
	                    <div className="card-body">
	                        <div className="d-flex flex-row">
	                            <div className="round round-lg align-self-center round-primary"><i className="fa fa-car"></i></div>
	                            <div className="m-l-10 align-self-center">
	                                <h3 className="m-b-0 font-lgiht">{this.props.userAnalyticsListingViewCar.length>0 ? this.props.userAnalyticsListingViewCar[0].name : null}</h3>
	                                <h5 className="text-muted m-b-0">Most Popular Car Service</h5></div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
		        <BarChart width={this.state.width} height={300} data={this.props.userAnalyticsPageClicks} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
		        	<XAxis dataKey="name">
		        		<Label value="Pages" offset={0} position="insideBottom" />
		      		</XAxis>
		      		<YAxis label={{ value: 'Clicks', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
			       <CartesianGrid strokeDasharray="3 3"/>
			       <Tooltip/>
			       <Legend />
			       <Bar dataKey="value" stackId="a" fill="#82ca9d" />
			    </BarChart>
		        <BarChart width={this.state.width} height={300} data={this.props.userAnalyticsListingViewCar} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
		        	<XAxis dataKey="name">
		        		<Label value="Car Service" offset={0} position="insideBottom" />
		      		</XAxis>
		      		<YAxis label={{ value: 'Number of Clicks', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
			       <CartesianGrid strokeDasharray="3 3"/>
			       <Tooltip/>
			       <Legend />
			       <Bar dataKey="value" stackId="a" fill="#f46b42" />
			    </BarChart>
		        <BarChart width={this.state.width} height={300} data={this.props.userAnalyticsListingViewHotel} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
		        	<XAxis dataKey="name">
		        		<Label value="Hotel" offset={0} position="insideBottom" />
		      		</XAxis>
		      		<YAxis label={{ value: 'Number of Clicks', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
			       <CartesianGrid strokeDasharray="3 3"/>
			       <Tooltip/>
			       <Legend />
			       <Bar dataKey="value" stackId="a" fill="#8884d8" />
			    </BarChart>
			    <BarChart width={this.state.width} height={300} data={this.props.userAnalyticsListingViewFlight} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
		        	<XAxis dataKey="name">
		        		<Label value="Airline" offset={0} position="insideBottom" />
		      		</XAxis>
		      		<YAxis label={{ value: 'Number of Clicks', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
			       <CartesianGrid strokeDasharray="3 3"/>
			       <Tooltip/>
			       <Legend />
			       <Bar dataKey="value" stackId="a" fill="#82ca9d" />
			      </BarChart>
			    <BarChart width={this.state.width} height={600} data={this.props.userActivityTracking} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
			      <XAxis dataKey="name">
		        		<Label value="User" offset={0} position="insideBottom" />
		      		</XAxis>
		           <YAxis label={{ value: 'Time spent on page (in seconds)', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
			       <CartesianGrid strokeDasharray="3 3"/>
			       <Tooltip/>
			       {this.state.bars}
				  </BarChart>
            </div>
  	    );
	}
}


function mapDispatchToProps(dispatch) {
    return {
    	getUserAnalytics : () => dispatch(actions.getUserAnalytics())
    };
}

function mapStateToProps(state) {
    return {
    	userAnalyticsPageClicks : state.userTrackingReducer.userAnalyticsPageClicks,
    	userAnalyticsListingViewCar : state.userTrackingReducer.userAnalyticsListingViewCar,
    	userAnalyticsListingViewHotel : state.userTrackingReducer.userAnalyticsListingViewHotel,
    	userAnalyticsListingViewFlight : state.userTrackingReducer.userAnalyticsListingViewFlight,
    	userActivityTracking : state.userTrackingReducer.userActivityTracking
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <UserTracking {...props}/>));
