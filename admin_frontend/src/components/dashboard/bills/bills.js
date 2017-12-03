import React, { Component } from 'react';
import './bills.css';
import {getAllBills } from '../../../actions/bills';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import BillComponent  from './billComponent';

class Bills extends Component {
	constructor(props){
		super(props);
		this.state = {
			bookingId : '' ,
			createdDate : '', 
			_id : '',
			totalAmount : '', 
			userId : '',
			listingId : '',
			listingType : ''
		}
	}

	componentDidMount(){
		this.props.getAllBills();
	}

	componentWillReceiveProps(newProps) { 
    }

	render() {
		return (
    		<div className="row module-content">
				 <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 divForHeaders">
					 <div className="row listHeader">
						 <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 dataDiv">
							 <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
								 <b>Bill Id</b>
							 </div>
							 <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
								 <b>Booking Id</b>
							 </div>
							 <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
								 <b>Listing Type</b>
							 </div>
							 <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
								 <b>Total Amount</b>
							 </div>
						 </div>
					 </div>
					{
						(this.props.listOfBills && this.props.listOfBills.length>0) ? this.props.listOfBills.map((bill , key) => {
							return <BillComponent bill={bill}  key={key}> </BillComponent>
						}) : null
					}
				</div>
			</div>
  	    );
	}
}


function mapDispatchToProps(dispatch) {
  return {
    getAllBills : () => dispatch(getAllBills()) 
  };
}

function mapStateToProps(state) {
    return {
        listOfBills : state.billsReducer ? state.billsReducer.allBills : null
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <Bills {...props}/>));
