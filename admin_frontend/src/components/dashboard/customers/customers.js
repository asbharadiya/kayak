import React, { Component } from 'react';
import './customers.css';
import {addCustomer , getAllCustomers } from '../../../actions/customers'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import CustomerComponent  from './customerComponent';

class Customers extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName : '' ,
            address : '',
            city : '',
            state : '',
            zip_code : '',
            profile_image : '',
            phone_number : '',
            email : '',
            lastName : ''
        }
    }

    componentDidMount(){
        this.props.getAllCustomers();
    }

    componentWillReceiveProps(newProps) {
    }

    render() {
        return (
			<div className="row module-content">
				<div className="col-xs-12">
					<input type="text" className="form-control" placeholder="Search" />
				</div>
				<div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 divForHeaders">
					<div className="row listHeader">
						<div className="col-md-10 col-sm-10 col-lg-10 col-xs-10 dataDiv">
							<div className="col-md-1 col-sm-1 col-lg-1 col-xs-1">
								<b>Profile</b>
							</div>
							<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
								<b>Customer Name</b>
							</div>
							<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4">
								<b>Address</b>
							</div>
							<div className="col-md-4 col-sm-4 col-lg-4 col-xs-4">
								<b>Contact Info</b>
							</div>
						</div>
					</div>
                    {
                        this.props.listOfCustomers ? this.props.listOfCustomers.map((customer , key) => {
                            return <CustomerComponent customer={customer}  key={key}> </CustomerComponent>
                        }) : null
                    }
				</div>
			</div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCustomers : () => dispatch(getAllCustomers())
    };
}

function mapStateToProps(state) {
    return {
        listOfCustomers : state.customersReducer ? state.customersReducer.allCustomers : null
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <Customers {...props}/>));