import React, { Component } from 'react';
import {PieChart, Pie, Legend, Tooltip, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar, Label } from 'recharts';
import './home.css';
import * as actions from '../../../actions/home';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			revenueByType : [],
			orderByType : [],
			totalRevenue : 0,
		    totalOrders : 0,
			revenueByCity : [],
			revenueByTopCmpny : [],
			revenueByTopCmpnyMonth : [],
			userCount : [],
			listingCount : [],
			pieData : [{name: 'Cars', value: 2400}, {name: 'Hotels', value: 4567},
                {name: 'Flights', value: 1398}],
            lineData : [{name: 'Rosewood Hotels & Resorts', uv: 4000, pv: 9000, amt: 2400}, {name: 'Sandals Resorts', uv: 1800, pv: 7222, amt: 1800},
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
        this.props.getRevenueByType();
        this.props.getRevenueByCity();
        this.props.getRevenueByTopCmpny();
    }

	render() {
		return (
    		<div className="homepage">
    		<div>
	            <div className="col-lg-3 col-md-6">
	                <div className="card">
	                    <div className="card-body">
	                        <div className="d-flex flex-row">
	                            <div className="round round-lg align-self-center round-info"><i className="fa fa-cart-arrow-down"></i></div>
	                            <div className="m-l-10 align-self-center">
	                                <h3 className="m-b-0 font-light">{this.props.totalOrders}</h3>
	                                <h5 className="text-muted m-b-0">Orders</h5></div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div className="col-lg-3 col-md-6">
	                <div className="card">
	                    <div className="card-body">
	                        <div className="d-flex flex-row">
	                            <div className="round round-lg align-self-center round-warning"><i className="fa fa-money"></i></div>
	                            <div className="m-l-10 align-self-center">
	                                <h3 className="m-b-0 font-lgiht">{"$"+this.props.totalRevenue}</h3>
	                                <h5 className="text-muted m-b-0">Revenue</h5></div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div className="col-lg-3 col-md-6">
	                <div className="card">
	                    <div className="card-body">
	                        <div className="d-flex flex-row">
	                            <div className="round round-lg align-self-center round-primary"><i className="fa fa-usd"></i></div>
	                            <div className="m-l-10 align-self-center">
	                                <h3 className="m-b-0 font-lgiht">{"$"+(this.props.totalRevenue*0.20)}</h3>
	                                <h5 className="text-muted m-b-0">Earning</h5></div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div className="col-lg-3 col-md-6">
	                <div className="card">
	                    <div className="card-body">
	                        <div className="d-flex flex-row">
	                            <div className="round round-lg align-self-center round-danger"><i className="fa fa-users"></i></div>
	                            <div className="m-l-10 align-self-center">
	                                <h3 className="m-b-0 font-lgiht">{(this.props.userCount && this.props.userCount.length>0) ?this.props.userCount[0].value : null}</h3>
	                                <h5 className="text-muted m-b-0">Users</h5></div>
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
			   <LineChart width={580} height={300} data={this.props.revenueByTopCmpny} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
				   <XAxis dataKey="name">
		       		<Label value="Top 10 Revenue Generating Company in last year" offset={0} position="insideBottom" />
		     	   </XAxis>
		     	   <YAxis label={{ value: 'Revenue in last year', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
			       <CartesianGrid strokeDasharray="3 3"/>
			       <Tooltip/>
			       <Legend />
			       <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" />
		       </LineChart>
			   <AreaChart width={580} height={300} data={this.props.revenueByTopCmpnyMonth} syncId="anyId" margin={{top: 5, right: 30, left: 20, bottom: 5}}>
			   	  <XAxis dataKey="name">
		       		<Label value="Top 10 Revenue Generating Company in last month" offset={0} position="insideBottom" />
		     	  </XAxis>
		     	  <YAxis label={{ value: 'Revenue in last months', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
		          <CartesianGrid strokeDasharray="3 3"/>
		          <Tooltip/>
		          <Area type='monotone' dataKey='totalAmount' stroke='#82ca9d' fill='#82ca9d' />
		        </AreaChart>
		        <BarChart width={1200} height={300} data={this.props.revenueByCity} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
		        	<XAxis dataKey="name">
		        		<Label value="Cities" offset={0} position="insideBottom" />
		      		</XAxis>
		      		<YAxis label={{ value: 'Revenue', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
			       <CartesianGrid strokeDasharray="3 3"/>
			       <Tooltip/>
			       <Legend />
			       <Bar dataKey="revenue" stackId="a" fill="#8884d8" />
			       <Bar dataKey="orders" stackId="a" fill="#82ca9d" />
			      </BarChart>
            </div>
  	    );
	}
}


function mapDispatchToProps(dispatch) {
    return {
    	getRevenueByType : () => dispatch(actions.getRevenueByType()),
    	getRevenueByCity : () => dispatch(actions.getRevenueByCity()),
    	getRevenueByTopCmpny : () => dispatch(actions.getRevenueByTopCmpny())
    };
}

function mapStateToProps(state) {
    return {
    	revenueByType : state.homeReducer.revenueByType,
    	orderByType : state.homeReducer.orderByType,
    	totalRevenue : state.homeReducer.totalRevenue,
        totalOrders : state.homeReducer.totalOrders,
    	revenueByCity : state.homeReducer.revenueByCity,
    	revenueByTopCmpny : state.homeReducer.revenueByTopCmpny,
    	revenueByTopCmpnyMonth : state.homeReducer.revenueByTopCmpnyMonth,
    	userCount : state.homeReducer.userCount,
    	listingCount : state.homeReducer.listingCount
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <Home {...props}/>));
