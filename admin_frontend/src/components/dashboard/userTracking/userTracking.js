import React, { Component } from 'react';
import {PieChart, Pie, Legend, Tooltip, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, BarChart, Bar, Label } from 'recharts';
import './userTracking.css';
import * as actions from '../../../actions/userTracking';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class UserTracking extends Component {
	
	constructor(props){
		super(props);
		let bars = [];
		for (var i = 0; i < 10; i++) {
			bars.push(<Bar dataKey={"Bookings-"+i+"-visit"} stackId="a" fill="#82ca9d" />);
			bars.push(<Bar dataKey={"Cars-"+i+"-visit"} stackId="a" fill="#8884d8" />);
			bars.push(<Bar dataKey={"Flight-"+i+"-visit"} stackId="a" fill="#f46b42" />);
			bars.push(<Bar dataKey={"Hotel-"+i+"-visit"} stackId="a" fill="#82ca9d" />);
			bars.push(<Bar dataKey={"Cars-listing-"+i+"-visit"} stackId="a" fill="#8884d8" />);
			bars.push(<Bar dataKey={"Hotel-listing-"+i+"-visit"} stackId="a" fill="#82ca9d" />);
			bars.push(<Bar dataKey={"Flight-listing-"+i+"-visit"} stackId="a" fill="#f46b42" />);
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
			pieData : [{name: 'Cars', value: 2400}, {name: 'Hotels', value: 4567},
                {name: 'Flights', value: 1398}],
            lineData : [{name: 'Rosewood Hotels & Resorts', uv1: 4000, pv1: 9000, uv2: 4000, pv2: 9000, amt: 2400}, {name: 'Sandals Resorts', uv: 1800, pv: 7222, amt: 1800}, 
            	{name: 'Sonesta Collection Hotels', uv: 2000, pv: 750, amt: 750}, {name: 'W Hotels & Resorts', uv: 2000, pv: 1900, amt: 1900},
            	{name: 'Virgin America', uv: 2000, pv: 1350, amt: 1350}, {name: 'Delta Air Lines', uv: 2000, pv: 900, amt: 900},
            	{name: 'JetBlue', uv: 2000, pv: 2100, amt: 2100}, {name: 'United', uv: 2000, pv: 1625, amt: 1625},
            	{name: 'Alaska', uv: 2000, pv: 600, amt: 600}, {name: 'Southwest', uv: 2000, pv: 1700, amt: 1700}],
            barData : [
                {name: 'San Fransisco', cars: 4000, hotels: 2400, flights: 2400},
                {name: 'New York', cars: 3000, hotels: 1398, flights: 2210},
                {name: 'Boston', cars: 2000, hotels: 9800, flights: 2290},
                {name: 'Las Vegas', cars: 2780, hotels: 3908, flights: 2000},
                {name: 'Huston', cars: 1890, hotels: 4800, flights: 2181},
                {name: 'Seattle', cars: 2390, hotels: 3800, flights: 2500},
                {name: 'San Jose', cars: 3490, hotels: 4300, flights: 2100},
                {name: 'Dallas', cars: 4000, hotels: 2400, flights: 2400},
                {name: 'New Jersy', cars: 3000, hotels: 1398, flights: 2210},
                {name: 'Miami', cars: 2000, hotels: 9800, flights: 2290},
                {name: 'LA', cars: 2780, hotels: 3908, flights: 2000},
                {name: 'Washingotn', cars: 1890, hotels: 4800, flights: 2181},
                {name: 'Reno', cars: 2390, hotels: 3800, flights: 2500},
                {name: 'Florida', cars: 3490, hotels: 4300, flights: 2100}
             ]
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
		   		<PieChart width={375} height={400}>
					<text x={200} y={200} dy={8} textAnchor="middle" fill="#f46b42">Listings</text>
			        <Pie data={this.props.listingCount} cx={200} cy={200} innerRadius={40} outerRadius={80} fill="#f46b42" label/>
			        <Tooltip/>
			   </PieChart>
	    		<PieChart width={375} height={400}>
	    			<text x={200} y={200} dy={8} textAnchor="middle" fill="#8884d8">Revenue</text>
		            <Pie data={this.props.revenueByType} cx={200} cy={200} innerRadius={40} outerRadius={80} fill="#8884d8" label/>
		            <Tooltip/>
	           </PieChart>
	           <PieChart width={375} height={400}>
	    			<text x={200} y={200} dy={8} textAnchor="middle" fill="#82ca9d">Orders</text>
		            <Pie data={this.props.orderByType} cx={200} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" label/>
		            <Tooltip/>
	           </PieChart>
		        <BarChart width={1200} height={300} data={this.props.userAnalyticsPageClicks} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
		        	<XAxis dataKey="name">
		        		<Label value="Pages" offset={0} position="insideBottom" />
		      		</XAxis>
		      		<YAxis label={{ value: 'Clicks', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
			       <CartesianGrid strokeDasharray="3 3"/>
			       <Tooltip/>
			       <Legend />
			       <Bar dataKey="value" stackId="a" fill="#8884d8" />
			    </BarChart>
		        <BarChart width={1200} height={300} data={this.props.userAnalyticsListingViewCar} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
		        	<XAxis dataKey="name">
		        		<Label value="Car Service" offset={0} position="insideBottom" />
		      		</XAxis>
		      		<YAxis label={{ value: 'Number of Clicks', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
			       <CartesianGrid strokeDasharray="3 3"/>
			       <Tooltip/>
			       <Legend />
			       <Bar dataKey="value" stackId="a" fill="#8884d8" />
			    </BarChart>
		        <BarChart width={1200} height={300} data={this.props.userAnalyticsListingViewHotel} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
		        	<XAxis dataKey="name">
		        		<Label value="Hotel" offset={0} position="insideBottom" />
		      		</XAxis>
		      		<YAxis label={{ value: 'Number of Clicks', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
			       <CartesianGrid strokeDasharray="3 3"/>
			       <Tooltip/>
			       <Legend />
			       <Bar dataKey="value" stackId="a" fill="#8884d8" />
			    </BarChart>
			    <BarChart width={1200} height={300} data={this.props.userAnalyticsListingViewFlight} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
		        	<XAxis dataKey="name">
		        		<Label value="Airline" offset={0} position="insideBottom" />
		      		</XAxis>
		      		<YAxis label={{ value: 'Number of Clicks', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
			       <CartesianGrid strokeDasharray="3 3"/>
			       <Tooltip/>
			       <Legend />
			       <Bar dataKey="value" stackId="a" fill="#8884d8" />
			      </BarChart>
			      <BarChart width={600} height={600} data={this.props.userActivityTracking}
		            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
			       <XAxis dataKey="name"/>
			       <YAxis/>
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