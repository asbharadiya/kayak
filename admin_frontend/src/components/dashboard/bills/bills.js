import React, { Component } from 'react';
import './bills.css';
import {getAllBills } from '../../../actions/bills';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import BillComponent  from './billComponent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import  MonthPickerInput from 'react-month-picker-input';

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
			listingType : '' ,
			selectBy : 'all' ,
			checkInDate : moment()
		}
	}

	componentDidMount(){
		this.props.getAllBills('all' ,'*');
	}

	componentWillReceiveProps(newProps) {
    }

    handleSelectBy(param){
    	this.setState({ selectBy : param}) ;

    	if(param === "all"){
    		this.props.getAllBills('all' ,'*');
    	}
    }

     handleFetchBillingDateChange(date){
        this.setState({
            checkInDate: date,
        });
        this.props.getAllBills('date' , moment(date).format('MM-DD-YYYY'));
    }

    handleFetchBillingMonthChange(){
    	this.props.getAllBills('month' , '12 2017');
    }

	render() {


		return (
    		<div className="row module-content">
				 <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 divForHeaders">

				 	<div className="div-filter-area">
				 		<div className="radio-options">
                           	<label className="radio-inline">
                                <input type="radio" name="pickByAll"
                                       value="month" checked={this.state.selectBy === 'all'}
                                       onChange={this.handleSelectBy.bind(this,'all')}/>
                                Select All
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="pickByDate"
                                       value="date" checked={this.state.selectBy === 'date'}
                                       onChange={this.handleSelectBy.bind(this,'date')}/>
                                Select by Date
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="pickByMonth"
                                       value="month" checked={this.state.selectBy === 'month'}
                                       onChange={this.handleSelectBy.bind(this,'month')}/>
                                Select By Month
                            </label>

                        </div>
				 	</div>


				 	<div className="select-category">
					 	{
					 		this.state.selectBy === 'date' ?
					 		<div>
						 		<div className="field-container date">
		                            <label>Select Bill Date</label>
		                            <DatePicker className="form-control" readOnly={true}
		                                        minDate={moment()}
		                                        selected={this.state.checkInDate}
		                                        onChange={this.handleFetchBillingDateChange.bind(this)}
		                            />
		                        </div>
						 	</div>

						 	:

						 	(
						 		this.state.selectBy === 'month' ?
						 		<div className="month-picker-div">
						 			<div className="select-month">
						 				<b>Select Month and Year</b>
						 			</div>

							 		<MonthPickerInput className="month-picker"
										  value={new Date()}
										  onChange={this.handleFetchBillingMonthChange.bind(this)}
									/>
							 	</div>
						 	:
						 		<div></div>
						 	)


					 	}

				 	</div>




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
    getAllBills : (category , value) => dispatch(getAllBills( category , value))
  };
}

function mapStateToProps(state) {
    return {
        listOfBills : state.billsReducer ? state.billsReducer.allBills : null
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <Bills {...props}/>));
