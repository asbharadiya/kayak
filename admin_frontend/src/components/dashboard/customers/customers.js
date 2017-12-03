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
            lastName : '' ,
            tempCustomerArray : [] , 
            arrayToShow : [] 
        }
    }

    componentDidMount(){
        this.props.getAllCustomers();
    }

    componentWillReceiveProps(newProps) {
        var tempArray = [] ; 
         if(newProps.listOfCustomers.length > 0){
            newProps.listOfCustomers.forEach(customer => {
                var address = (customer.address ? customer.address : null )  +  (customer.city ? ", " + customer.city : null ) +  ( customer.state ? ", " + customer.state : null)  +  (customer.zip_code ? ", " + customer.zip_code : null ) ; 
                var name = customer.firstName + " " +  customer.lastName ; 
                var contact = ( customer.email ? customer.email : null ) +  ( customer.phone_number ? ", " + customer.phone_number : null ) ;
                tempArray.push({ name : name ,   address : address , contact : contact })
                  
            })
         }
        this.setState({ tempCustomerArray : tempArray , arrayToShow : tempArray })
    }

    searchCustomers(e){
     
        if(this.state.tempCustomerArray.length > 0){
            var filtererdArray = this.state.tempCustomerArray.filter(function(customer) { 
                return ( customer.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || 
                        customer.contact.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || 
                        customer.address.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ) 
            });
            this.setState({arrayToShow : filtererdArray} , function(){console.log(this.state.arrayToShow) ; }) ; 
        }
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
        listOfCustomers : state.customersReducer ? state.customersReducer.allCustomers : null
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <Customers {...props}/>));