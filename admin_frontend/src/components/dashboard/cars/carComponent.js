import React, { Component } from 'react';
import './carComponent.css'
import { Modal } from 'react-bootstrap';
import { deleteCarById } from '../../../actions/cars'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


class CarComponent extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			openDeleteModal : false
		}
	}

	render() {
		return (
    		<div className="singleCarComponent">
				<section>
					<div className="row mainRowDiv">
						<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 mainRowDivContent">
							<div className="col-md-9 col-sm-9 col-lg-9 col-xs-9 dataDiv">
								<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12">
									<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
										{this.props.car.carName}
									</div>
									<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
										{this.props.car.carType}
									</div>
									<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
										{this.props.car.carQuantity}
									</div>
									<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
										{this.props.car.dailyRentalValue}
									</div>
								</div>


								
							</div>
							<div className="col-md-2 col-sm-1 col-lg-1 col-xs-1 ">
								<button className="btn btn-info btn-sm sharpButton" >Update</button>
							</div>
							<div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 ">
								<button className="btn btn-danger btn-sm sharpButton" onClick={() => {
									this.setState({
										openDeleteModal : true
									})
								}}>Remove</button>
							</div>
						
						
						</div>
						
					</div>

					 <Modal show={this.state.openDeleteModal}  id="carModal" className="carModal">	
						
						<Modal.Body className="carDeleteBody">
							<b>Are you sure to delete {this.props.car.carName } ?  </b>
						</Modal.Body>
						
						<Modal.Footer className="carDeleteFooter">
							 <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12">
							 	<div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-md-offset-4 col-xs-offset-4 col-lg-offset-4 col-sm-offset-4">
							 		<button className="btn btn-danger" onClick={() => {
							 			console.log("TO delete is " , this.props.car._id) ;
							 			this.props.deleteCarById(this.props.car._id)

							 		}}>YES</button>
							 	</div>
							 	<div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 ">
							 		<button className="btn" onClick={() => {
							 			this.setState({openDeleteModal : false})
							 		}}>NO</button>
							 	</div>
							 </div>
						</Modal.Footer>
					
					</Modal>
				
				</section>

			</div>
  	    );
	}
}



function mapDispatchToProps(dispatch) {
  return {
    deleteCarById : (id) => dispatch(deleteCarById(id)) ,
   
  };
}

function mapStateToProps(state) {
    return {
        listOfCars : state.carsReducer.allCars , 
        carAddSuccess : state.carsReducer.carAddSuccess
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <CarComponent {...props}/>));
