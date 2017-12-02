import React, { Component } from 'react';
import {PieChart, Pie, Legend, Tooltip, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, BarChart, Bar, Label } from 'recharts';
import './userTracking.css';

class UserTracking extends Component {
	
	constructor(props){
		super(props);
		this.state = {
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
	
	render() {
		return (
    		<div className="userTrackingpage">
    		<div>
	            <div class="col-lg-3 col-md-6">
	                <div class="card">
	                    <div class="card-body">
	                        <div class="d-flex flex-row">
	                            <div class="round round-lg align-self-center round-info"><i class="fa fa-cart-arrow-down"></i></div>
	                            <div class="m-l-10 align-self-center">
	                                <h3 class="m-b-0 font-light">3249</h3>
	                                <h5 class="text-muted m-b-0">Orders</h5></div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div class="col-lg-3 col-md-6">
	                <div class="card">
	                    <div class="card-body">
	                        <div class="d-flex flex-row">
	                            <div class="round round-lg align-self-center round-warning"><i class="fa fa-money"></i></div>
	                            <div class="m-l-10 align-self-center">
	                                <h3 class="m-b-0 font-lgiht">$211376</h3>
	                                <h5 class="text-muted m-b-0">Revenue</h5></div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div class="col-lg-3 col-md-6">
	                <div class="card">
	                    <div class="card-body">
	                        <div class="d-flex flex-row">
	                            <div class="round round-lg align-self-center round-primary"><i class="fa fa-usd"></i></div>
	                            <div class="m-l-10 align-self-center">
	                                <h3 class="m-b-0 font-lgiht">$179555</h3>
	                                <h5 class="text-muted m-b-0">Earning</h5></div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div class="col-lg-3 col-md-6">
	                <div class="card">
	                    <div class="card-body">
	                        <div class="d-flex flex-row">
	                            <div class="round round-lg align-self-center round-danger"><i class="fa fa-users"></i></div>
	                            <div class="m-l-10 align-self-center">
	                                <h3 class="m-b-0 font-lgiht">5687</h3>
	                                <h5 class="text-muted m-b-0">Visitor</h5></div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
    		
	    		<PieChart width={375} height={400}>
	    			<text x={200} y={200} dy={8} textAnchor="middle" fill="#8884d8">Revenue</text>
		            <Pie data={this.state.pieData} cx={200} cy={200} innerRadius={40} outerRadius={80} fill="#8884d8" label/>
		            <Tooltip/>
	           </PieChart>
	           <PieChart width={375} height={400}>
	    			<text x={200} y={200} dy={8} textAnchor="middle" fill="#82ca9d">Orders</text>
		            <Pie data={this.state.pieData} cx={200} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" label/>
		            <Tooltip/>
	           </PieChart>
		   		<PieChart width={375} height={400}>
					<text x={200} y={200} dy={8} textAnchor="middle" fill="#f46b42">Users</text>
			        <Pie data={this.state.pieData} cx={200} cy={200} innerRadius={40} outerRadius={80} fill="#f46b42" label/>
			        <Tooltip/>
			   </PieChart>
			   <LineChart width={580} height={300} data={this.state.lineData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
				   <XAxis dataKey="name">
		       		<Label value="Top 10 Revenue Generating Company in last year" offset={0} position="insideBottom" />
		     	   </XAxis>
		     	   <YAxis label={{ value: 'Revenue in last year', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
			       <CartesianGrid strokeDasharray="3 3"/>
			       <Tooltip/>
			       <Legend />
			       <Line type="monotone" dataKey="pv" stroke="#8884d8" />
			       <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
		       </LineChart>
			   <AreaChart width={580} height={300} data={this.state.lineData} syncId="anyId" margin={{top: 5, right: 30, left: 20, bottom: 5}}>
			   	  <XAxis dataKey="name">
		       		<Label value="Top 10 Revenue Generating Company in last month" offset={0} position="insideBottom" />
		     	  </XAxis>
		     	  <YAxis label={{ value: 'Revenue in last months', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
		          <CartesianGrid strokeDasharray="3 3"/>
		          <Tooltip/>
		          <Area type='monotone' dataKey='pv' stroke='#82ca9d' fill='#82ca9d' />
		        </AreaChart>
		        <BarChart width={1200} height={300} data={this.state.barData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
		        	<XAxis dataKey="name">
		        		<Label value="Cities" offset={0} position="insideBottom" />
		      		</XAxis>
		      		<YAxis label={{ value: 'Revenue', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
			       <CartesianGrid strokeDasharray="3 3"/>
			       <Tooltip/>
			       <Legend />
			       <Bar dataKey="hotels" stackId="a" fill="#8884d8" />
			       <Bar dataKey="flights" stackId="a" fill="#82ca9d" />
			       <Bar dataKey="cars" fill="#ffc658"/>
			      </BarChart>
            </div>
  	    );
	}
}

export default UserTracking;
