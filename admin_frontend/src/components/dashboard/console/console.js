import React, { Component } from 'react';
import {PieChart, Pie, Legend, Tooltip} from 'recharts';
import './console.css';

class Console extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			data01 : [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
                {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
                {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}]
		}
	}
	
	render() {
		return (
    		<div className="consolepage">
	    		<PieChart width={375} height={400}>
	    			<text x={200} y={200} dy={8} textAnchor="middle" fill="#8884d8">Revenue</text>
		            <Pie data={this.state.data01} cx={200} cy={200} innerRadius={40} outerRadius={80} fill="#8884d8" label/>
		            <Tooltip/>
	           </PieChart>
	           <PieChart width={375} height={400}>
	    			<text x={200} y={200} dy={8} textAnchor="middle" fill="#82ca9d">Orders</text>
		            <Pie data={this.state.data01} cx={200} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" label/>
		            <Tooltip/>
	           </PieChart>
		   		<PieChart width={375} height={400}>
					<text x={200} y={200} dy={8} textAnchor="middle" fill="#f46b42">Users</text>
			        <Pie data={this.state.data01} cx={200} cy={200} innerRadius={40} outerRadius={80} fill="#f46b42" label/>
			        <Tooltip/>
			   </PieChart>
            </div>
  	    );
	}
}

export default Console;
