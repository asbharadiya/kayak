import React, { Component } from 'react';
import './customers.css';
import { getAllCustomers } from '../../../actions/customers'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import CustomerComponent  from './customerComponent';

class Customers extends Component {
    constructor(props){
        super(props);
        this.state = {
            tempCustomerArray : [] ,
            arrayToShow : []
        }
    }

    componentDidMount(){
        this.props.getAllCustomers();
    }

    componentWillReceiveProps(newProps) {
        if(newProps.customerDeleteSuccess != null && newProps.customerDeleteSuccess){
            this.props.getAllCustomers();
        }
        var tempArray = [] ;
        if(newProps.listOfCustomers.length > 0){
            newProps.listOfCustomers.forEach(customer => {
                tempArray.push({ ...customer,name:customer.firstName + " " +  customer.lastName })

            })
        }
        this.setState({ tempCustomerArray : tempArray , arrayToShow : tempArray });
    }

    searchCustomers(e){
        var filtererdArray = this.state.tempCustomerArray.filter(function(customer) {
            return ( customer.name.toLowerCase().indexOf(e.target.value.trim().toLowerCase()) > -1 ||
                (customer.address ? (customer.address.toLowerCase().indexOf(e.target.value.trim().toLowerCase()) > -1):false) ||
                (customer.city ? (customer.city.toLowerCase().indexOf(e.target.value.trim().toLowerCase()) > -1):false) ||
                (customer.state ? (customer.state.toLowerCase().indexOf(e.target.value.trim().toLowerCase()) > -1):false) ||
                (customer.zip_code ? (customer.zip_code.toLowerCase().indexOf(e.target.value.trim().toLowerCase()) > -1):false) ||
                (customer.email ? (customer.email.toLowerCase().indexOf(e.target.value.trim().toLowerCase()) > -1):false) ||
                (customer.phone_number ? (customer.phone_number.toLowerCase().indexOf(e.target.value.trim().toLowerCase()) > -1):false) );
        });
        this.setState({arrayToShow : filtererdArray}) ;
    }

    render() {

        return (
			<div className="row module-content">
				<div className="search-div col-xs-12">
					<input type="text"  onChange={this.searchCustomers.bind(this)} className="form-control" placeholder="Search" />
				</div>
				<div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 divForHeaders">
					<div className="row listHeader">
						<div className="col-md-10 col-sm-10 col-lg-10 col-xs-10 dataDiv">
							<div className="col-md-1 col-sm-1 col-lg-1 col-xs-1">

							</div>
							<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
								<b>Name</b>
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
                        this.props.listOfCustomers ? this.state.arrayToShow.map((customer , key) => {
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
        listOfCustomers : state.customersReducer.allCustomers,
        customerDeleteSuccess : state.customersReducer.customerDeleteSuccess,
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <Customers {...props}/>));
