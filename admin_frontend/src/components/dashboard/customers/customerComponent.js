import React, { Component } from 'react';
import './customerComponent.css'
import { Modal } from 'react-bootstrap';
import { deleteCustomerById , getCustomerById, getAllCustomers } from '../../../actions/customers';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class CustomerComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            openDeleteModal : false
        }
        this.deleteCustomer = this.deleteCustomer.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if( (newProps.customerDeleteSuccess != null && newProps.customerDeleteSuccess) ) {
            this.setState({
                openDeleteModal : false
            })
        }
    }

    deleteCustomer(){
        this.props.deleteCustomerById(this.props.customer._id) ;
    }

    render() {
       
        return (
			<div className="singleComponent">
				<div className="row mainRowDiv customer-row">
					<div className="col-md-10 col-sm-10 col-lg-10 col-xs-10">
						<div className="col-md-1 col-sm-1 col-lg-1 col-xs-1">
                            <img className="profileImage" src={this.props.customer.profile_image ? this.props.customer.profile_image:'/assets/images/user.png'}
                                 alt="profile"/>

						</div>
                        <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
                            {this.props.customer.firstName} {this.props.customer.lastName}
                        </div>
                        <div className="col-md-4 col-sm-4 col-lg-4 col-xs-4">
                            <div>{this.props.customer.address}</div>
                            <div>{this.props.customer.city}</div>
                            <div>{this.props.customer.state}</div>
                            <div>{this.props.customer.zip_code}</div>
                        </div>
                        <div className="col-md-4 col-sm-4 col-lg-4 col-xs-4">
                            <div>{this.props.customer.email}</div>
                            <div>{this.props.customer.phone_number}</div>
                        </div>
					</div>
					<div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 buttonGroup ">
						<a href="javascript:void(0)"><i className="fa fa-times fa-lg delete-icon" aria-hidden="true" onClick={() => {
                            this.setState({
                                openDeleteModal : true
                            })
                        }}></i></a>
					</div>
				</div>

				<Modal show={this.state.openDeleteModal}  id="customerModal" className="deleteModal">
					<Modal.Body>
						<b>Are you sure to delete {this.props.customer.firstName } ?  </b>
					</Modal.Body>
					<Modal.Footer>
						<button className="btn btn-primary btn-kayak" onClick={this.deleteCustomer}>YES</button>
						<button className="btn btn-default btn-kayak btn-kayak-default" onClick={() => {
                            this.setState({openDeleteModal : false})
                        }}>NO</button>
					</Modal.Footer>
				</Modal>
			</div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteCustomerById : (id) => dispatch(deleteCustomerById(id))
    };
}

function mapStateToProps(state) {
    return {
        customerDeleteSuccess : state.customersReducer.customerDeleteSuccess
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <CustomerComponent {...props}/>));
