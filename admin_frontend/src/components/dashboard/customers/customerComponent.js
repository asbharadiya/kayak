import React, { Component } from 'react';
import './customerComponent.css'
import { Modal } from 'react-bootstrap';
import { deleteCustomerById , getCustomerById, getAllCustomers } from '../../../actions/customers'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Loading from 'react-loading-spinner';

class CustomerComponent extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			openDeleteModal : false
		}
	}

	componentWillReceiveProps(newProps) { 
   }

	render() {
		return (
    		<div className="singleCustomerComponent">
				<div className="row mainRowDiv">
					<div className="col-md-10 col-sm-10 col-lg-10 col-xs-10 dataDiv">
						<div className="col-md-1 col-sm-1 col-lg-1 col-xs-1">
							{this.props.customer.profile_image}
						</div>
						<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
							{this.props.customer.firstName}
							{this.props.customer.lastName}
						</div>
						<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4">
							{this.props.customer.address ? this.props.customer.address : null}
							{this.props.customer.city ? ","+this.props.customer.city : null}
							{this.props.customer.state ? ","+this.props.customer.state : null}
							{this.props.customer.zip_code ? ","+this.props.customer.zip_code : null}
						</div>
						<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4">
							{this.props.customer.email ? this.props.customer.email : null}
							{this.props.customer.phone_number ? ","+this.props.customer.phone_number : null}
						</div>
					</div>
					<div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 buttonGroup ">	
						<a className="redIcon"><i className="fa fa-times fa-2x" aria-hidden="true" onClick={() => {
							this.setState({
								openDeleteModal : true
							})
						}}></i></a>						
					</div>
				</div>

				 <Modal show={this.state.openDeleteModal}  id="customerModal" className="customerModal">
					<Modal.Body className="customerDeleteBody">
						<b>Are you sure to delete {this.props.customer.firstName } ?  </b>
					</Modal.Body>
					<Modal.Footer className="customerDeleteFooter">
						 <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12">
							<div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-md-offset-4 col-xs-offset-4 col-lg-offset-4 col-sm-offset-4">
								<button className="btn btn-danger sharpCornerForInfoButton" onClick={() => {
									this.props.deleteCustomerById(this.props.customer._id)
									this.setState({openDeleteModal : false})
								}}>YES</button>
							</div>
							<div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 ">
								<button className="btn sharpCornerForInfoButton" onClick={() => {
									this.setState({openDeleteModal : false})
								}}>NO</button>
							</div>
						 </div>
					</Modal.Footer>
				</Modal>
			</div>
  	    );
	}
}

function mapDispatchToProps(dispatch) {
  return {
    deleteCustomerById : (id) => dispatch(deleteCustomerById(id)) ,
   	getCustomerById : (id) => dispatch(getCustomerById(id)) ,
   	getAllCustomers : () => dispatch(getAllCustomers())
  };
}

function mapStateToProps(state) {
    return {
        listOfCustomers : state.customersReducer.allCustomers , 
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <CustomerComponent {...props}/>));
