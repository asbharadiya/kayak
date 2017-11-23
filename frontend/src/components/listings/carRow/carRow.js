import React, { Component } from 'react';
import './carRow.css';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import CarRowComponent from './carRowComponent/carRowComponent'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { getAllCars } from '../../../actions/car'

class CarRow extends Component {

	componentWillMount(){
		this.props.getAllCars() ; 
	}

    render() {
    	return (
           <div>
           		 
           		{
           			this.props.allCars.length === 0 ? 
           			<h3>No Cars To Display</h3>
           			:

           			this.props.allCars.map((car , key) => {
           				return <CarRowComponent car={car} key={key} />
           			})
           		}

           		
           </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
  return {
   getAllCars : () => dispatch(getAllCars())
  }
}

function mapStateToProps(state) {
    return {
       allCars : state.carsReducer.allCars
    }	
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <CarRow {...props}/>));
