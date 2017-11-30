import React, { Component } from 'react';
import './flightComponent.css'
import { Modal } from 'react-bootstrap';
import { deleteFlightById , updateFlightById  } from '../../../actions/flights'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Loading from 'react-loading-spinner';
import * as api from '../../../api/flights';


class FlightComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            openDeleteModal : false,
            showFlightUpdateModal : false,


            flightNumber : '' ,
            airline : '' ,
            source : '' ,
            destination : '',
            arrival : '' ,
            departure : '',
            serviceStartDate : '',
            serviceEndDate : '',
            firstClassPrice : 0 ,
            businessClassPrice  : 0 ,
            economyClassPrice : 0 ,
            firstClassSeats : 0 ,
            businessClassSeats : 0,
            economyClassSeats : 0 ,
            _id : '' ,
            luggage : '',
            meals : '' , 


            updateFlightError : '' ,
            flightUpdateLoading : false ,
            updateErrorMessage : '',

           


        }

        this.openUpdateFlight = this.openUpdateFlight.bind(this);
        this.closeUpdateFlight = this.closeUpdateFlight.bind(this);
        this.fetchFlightData = this.fetchFlightData.bind(this);
        this.updateFlight = this.updateFlight.bind(this);
        this.deleteFlight = this.deleteFlight.bind(this);
        this.openDeleteFlight = this.openDeleteFlight.bind(this);
        this.closeDeleteFlight = this.closeDeleteFlight.bind(this);
        this.onMealsChanged = this.onMealsChanged.bind(this);
        this.onChangeLuggage = this.onChangeLuggage.bind(this) ;

    }


    componentWillReceiveProps(newProps) {

        if( (newProps.flightDeleteSuccess != null && newProps.flightDeleteSuccess) ) {
            this.closeDeleteFlight();
        }

        if(newProps.flightUpdateSuccess != null && newProps.flightUpdateSuccess){

            this.setState({flightUpdateLoading : false ,
                showFlightUpdateModal : false,
                updateErrorMessage : ''
            }) ;

        }

        if(newProps.flightUpdateSuccess === false){
            this.setState({flightUpdateLoading : false ,
                updateErrorMessage : 'Error occured while updating the flight record'
            }) ;
        }

    }



    openUpdateFlight(){
        this.setState({
            showFlightUpdateModal : true
        })
    }

    closeUpdateFlight(){
        this.setState({
            showFlightUpdateModal : false ,
            updateErrorMessage : '' ,
            flightUpdateLoading : false
        })
    }

   


    fetchFlightData(){
        var _this = this;
        api.getFlightById(this.props.flight._id, function(error, response){
            if(error){

            } else {
                response.then((res) => {
                    if(res.status === 200){
                        _this.setState({
                            flightNumber : res.data[0].flightNumber  ,
                            airline : res.data[0].airline  ,
                            source : res.data[0].source  ,
                            destination : res.data[0].destination  ,
                            arrival : res.data[0].arrival  ,
                            departure : res.data[0].departure  ,
                            serviceStartDate : res.data[0].serviceStartDate  ,
                            serviceEndDate : res.data[0].serviceEndDate  ,
                            economyClassSeats : res.data[0].economyClassSeats  ,
                            economyClassPrice : res.data[0].economyClassPrice  ,
                            businessClassSeats : res.data[0].businessClassSeats  ,
                            businessClassPrice : res.data[0].businessClassPrice  ,
                            firstClassSeats : res.data[0].firstClassSeats  ,
                            firstClassPrice : res.data[0].firstClassPrice,
                            luggage : res.data[0].luggage,
                            meals : res.data[0].meals
                        })
                    }else{

                    }
                })
            }
        })
    }


    onMealsChanged(e){
        console.log(e.target.value)
        this.setState({
            meals : e.target.value
        })
    }

    onChangeLuggage(e){
        this.setState({
            luggage : e.target.value
        })
    }




    updateFlight(){

        var startDate = new Date(this.state.serviceStartDate);
        startDate.setDate(startDate.getDate() + 1);
        var endDate = new Date(this.state.serviceEndDate);
        endDate.setDate(endDate.getDate() + 1);


        if(this.state.flightNumber === '' ){
            this.setState({ updateFlightError : "Please Specify Flight Number"})
            return ;
        }
        if(this.state.airline === '' ){
            this.setState({ updateFlightError : "Please Specify Airline Name"})
            return ;
        }
        if(this.state.source === '' ){
            this.setState({ updateFlightError : "Please Specify Sourtion"})
            return ;
        }
        if(this.state.destination === '' ){
            this.setState({ updateFlightError : "Please Specify Destination"})
            return ;
        }
        if(this.state.arrival === '' ){
            this.setState({ updateFlightError : "Please Specify Arrival Time"})
            return ;
        }
        if(this.state.departure === '' ){
            this.setState({ updateFlightError : "Please Specify Departure Time"})
            return ;
        }
        if(this.state.meals === '' ){
            this.setState({ updateFlightError : "Please Specify Meals"})
            return ;
        }
         if(this.state.luggage === '' ){
            this.setState({ updateFlightError : "Please Specify Luggage"})
            return ;
        }
        if(this.state.serviceStartDate === '' ){
            this.setState({ updateFlightError : "Please Specify Date from which service will start"})
            return ;
        }
        if(this.state.serviceEndDate === '' ){
            this.setState({ updateFlightError : "Please Specify Date on which service will end"})
            return ;
        }
        if(this.state.firstClassSeats == '' || this.state.businessClassSeats == '' || this.state.economyClassSeats == ''){
            this.setState({ updateFlightError : 'Please check SEATS for flight' })
            return
        }
        if(this.state.firstClassPrice == '' || this.state.businessClassPrice == '' || this.state.economyClassPrice == ''){
            this.setState({ updateFlightError : 'Please check PRICES for Corresponsing Flights' })
            return
        }
        if(startDate <= new Date()) {
            this.setState({ updateFlightError : "Service Start Date should be a future date"})
            return
        }
        if(endDate <= new Date())   {
            this.setState({ updateFlightError : "Service End Date should be a future date"})
            return
        }
        if(endDate <= startDate){

            this.setState({ updateFlightError : "Service End Date should be a greater than start date"})
            return
        }
        if(endDate <= startDate.setDate(startDate.getDate() + 14)){
            this.setState({ updateFlightError : "Service provided should not be less than 15 days"})
            return ;
        }

        var obj = {
            _id  : this.props.flight._id,
            flightNumber : this.state.flightNumber ,
            airline : this.state.airline ,
            source : this.state.source ,
            destination : this.state.destination,
            arrival : this.state.arrival ,
            departure : this.state.departure,
            serviceStartDate : this.state.serviceStartDate ,
            serviceEndDate : this.state.serviceEndDate ,
            firstClassPrice :  this.state.firstClassPrice,
            firstClassSeats : this.state.firstClassSeats,
            businessClassPrice : this.state.businessClassPrice ,
            businessClassSeats : this.state.businessClassSeats,
            economyClassPrice :  this.state.economyClassPrice,
            economyClassSeats : this.state.economyClassSeats,
            meals : this.state.meals ,
            luggage : this.state.luggage
        }


        this.setState({ updateFlightError : '' ,
            flightUpdateLoading : true,
            updateErrorMessage : ''
        })


        this.props.updateFlightById(obj , obj._id)

    }


    openDeleteFlight(){
        this.setState({
            openDeleteModal : true
        })
    }

    closeDeleteFlight(){
        this.setState({
            openDeleteModal : false
        })
    }

    deleteFlight(){
        this.props.deleteFlightById(this.props.flight._id) ;
    }



    render() {
       
       return (
            <div className="singleFlightComponent">
                <div className="row mainRowDiv">
                    <div className="col-md-9 col-sm-9 col-lg-9 col-xs-9 dataDiv">
                        <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
                            {this.props.flight.airline}
                        </div>
                        <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
                            {this.props.flight.flightNumber}
                        </div>
                        <div>
                            <div className=" col-md-3 col-sm-3 col-lg-3 col-xs-3">
                                <div>
                                    {this.props.flight.source}
                                </div>
                                <div>
                                    {this.props.flight.departure}
                                </div>

                            </div>
                        </div>
                        <div>
                            <div className=" col-md-3 col-sm-3 col-lg-3 col-xs-3">
                                <div>
                                    {this.props.flight.destination}
                                </div>
                                <div>
                                    {this.props.flight.arrival}
                                </div>

                            </div>
                        </div>

                        <div className=" col-md-1 col-sm-1 col-lg-1 col-xs-1">
                            {this.props.flight.class}
                        </div>
                        <div className=" col-md-2 col-sm-2 col-lg-2 col-xs-2">
                            {this.props.flight.price}
                        </div>

                    </div>
                    <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3 buttonGroup ">


                        <a><i className="fa fa-pencil-square-o fa-2x updateFontAwesome" aria-hidden="true" onClick={this.openUpdateFlight}></i></a>

                        <a className="redIcon"><i className="fa fa-times fa-2x" aria-hidden="true" onClick={this.openDeleteFlight}></i></a>

                    </div>


                    <Modal show={this.state.openDeleteModal}  id="flightModal" className="flightModal">


                        <Modal.Body className="flightDeleteBody">
                            <b>Are you sure to delete {this.props.flight.flightName } ?  </b>
                        </Modal.Body>

                        <Modal.Footer className="flightDeleteFooter">

                            <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12">
                                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 col-md-offset-4 col-xs-offset-4 col-lg-offset-4 col-sm-offset-4">
                                    <button className="btn btn-danger sharpCornerForInfoButton" onClick={this.deleteFlight}>YES</button>
                                </div>
                                <div className="col-md-2 col-sm-2 col-lg-2 col-xs-2 ">
                                    <button className="btn sharpCornerForInfoButton" onClick={this.closeDeleteFlight}>NO</button>
                                </div>
                            </div>
                        </Modal.Footer>

                    </Modal>
                    <Modal show={this.state.showFlightUpdateModal}  id="flightModal" className="flightModal" onEntered={this.fetchFlightData}>
                        <Modal.Body >

                            <div className="flightModalBody">

                                <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
                                    <label htmlFor="flightid">Flight Number</label>
                                    <input value={this.state.flightNumber} className="form-control sharpCorner" id="flightid" type="text"  onChange={(e) => {
                                        this.setState({
                                            flightNumber : e.target.value
                                        })
                                    }} aria-describedby="basic-addon1"
                                    />
                                </div>


                                <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
                                    <label htmlFor="airline">Airline Name</label>
                                    <input value={this.state.airline} className="form-control sharpCorner" id="airline" type="text"  onChange={(e) => {
                                        this.setState({
                                            airline : e.target.value
                                        })
                                    }} aria-describedby="basic-addon1"
                                    />
                                </div>


                                <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
                                    <label htmlFor="source">Source</label>
                                    <input value={this.state.source} className="form-control sharpCorner" onChange={(e) => {
                                        this.setState({
                                            source : e.target.value
                                        })
                                    }} id="source" type="text"  aria-describedby="basic-addon1"
                                    />
                                </div>


                                <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
                                    <label htmlFor="destination">Destination</label>
                                    <input value={this.state.destination} className="form-control sharpCorner" onChange={(e) => {
                                        this.setState({
                                            destination : e.target.value
                                        })
                                    }} id="destination" type="text"  aria-describedby="basic-addon1"
                                    />
                                </div>


                                <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
                                    <label htmlFor="departure">Departure</label>
                                    <input value={this.state.departure} className="form-control sharpCorner" onChange={(e) => {
                                        this.setState({
                                            departure : e.target.value
                                        })
                                    }} id="departure" type="time"  aria-describedby="basic-addon1"
                                    />
                                </div>


                                <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
                                    <label htmlFor="arrival">Arrival</label>
                                    <input value={this.state.arrival} className="form-control sharpCorner" onChange={(e) => {
                                        this.setState({
                                            arrival : e.target.value
                                        })
                                    }} id="arrival" type="time"  aria-describedby="basic-addon1"
                                    />
                                </div>


                                <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
                                       <label htmlFor="serviceStartDate">Lugagge Count</label>
                                        <select onChange={this.onChangeLuggage} value={this.state.luggage} className="form-control selectpicker" id="carType">
                                            <option  className="selected disabled hidden">Select</option>
                                            <optgroup label="Counts">
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                            </optgroup>
                                        </select>
                                        
                                </div>



                                <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
                                   <label htmlFor="serviceStartDate">Flight Service Start Date</label>
                                    <input value={this.state.serviceStartDate ? this.state.serviceStartDate.substr(0,10) : this.state.serviceStartDate} className="form-control sharpCorner" onChange={(e) => {
                                        this.setState({
                                            serviceStartDate : e.target.value
                                        })
                                    }} id="serviceStartDate" type="date"  aria-describedby="basic-addon1"
                                    />
                                </div>


                                <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
                                    <label htmlFor="serviceStartDate">Flight Service End Date</label>
                                    <input value={this.state.serviceEndDate ? this.state.serviceEndDate.substr(0,10) : this.state.serviceEndDate} className="form-control sharpCorner" onChange={(e) => {
                                        this.setState({
                                            serviceEndDate : e.target.value
                                        })
                                    }} id="serviceStartDate" type="date"  aria-describedby="basic-addon1"
                                    />
                                </div>


                                <div className="form-group  seats-div  col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
                                    <label htmlFor="class"># Seats</label>

                                    <div className="row">
                                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                            <p>First</p>
                                            <input   value={this.state.firstClassSeats}  onChange={(e) => {
                                                this.setState({ firstClassSeats : e.target.value  })
                                            }}   className="form-control sharpCorner"id="serviceEndDate" type="number"  aria-describedby="basic-addon1"/>
                                        </div>
                                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                            <p>Business</p>
                                            <input  value={this.state.businessClassSeats}   onChange={(e) => {
                                                this.setState({ businessClassSeats : e.target.value  })
                                            }}  className="form-control sharpCorner"id="serviceEndDate" type="number"  aria-describedby="basic-addon1"/>
                                        </div>
                                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                            <p>Economy</p>
                                            <input  value={this.state.economyClassSeats}  onChange={(e) => {
                                                this.setState({ economyClassSeats : e.target.value  })
                                            }}  className="form-control sharpCorner"id="serviceEndDate" type="number"  aria-describedby="basic-addon1"/>
                                        </div>
                                    </div>
                                </div>



                                <div className="form-group seats-div marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
                                    <label htmlFor="class">Price</label>

                                    <div className="row">
                                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                            <p>First</p>
                                            <input value={this.state.firstClassPrice}  onChange={(e) => {
                                                this.setState({ firstClassPrice : e.target.value  })
                                            }}  className="form-control sharpCorner"id="serviceEndDate" type="number"  aria-describedby="basic-addon1"/>
                                        </div>
                                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                            <p>Business</p>
                                            <input value={this.state.businessClassPrice}  onChange={(e) => {
                                                this.setState({ businessClassPrice : e.target.value  })
                                            }}  className="form-control sharpCorner"id="serviceEndDate" type="number"  aria-describedby="basic-addon1"/>
                                        </div>
                                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                            <p>Enonomy</p>
                                            <input value={this.state.economyClassPrice}  onChange={(e) => {
                                                this.setState({ economyClassPrice : e.target.value  })
                                            }}  className="form-control sharpCorner"id="serviceEndDate" type="number"  aria-describedby="basic-addon1"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Modal.Body>

                        <Modal.Footer className="flightModalFooter">

                            <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">
                                <div className="col-sm-5 col-lg-5 col-md-5 pull-right  text-right">
                                    <Loading isLoading={this.state.flightUpdateLoading} ></Loading>
                                </div>
                            </div>

                            <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2 flightAddErrorText">
                                {this.state.updateFlightError}
                                {this.state.updateErrorMessage}
                            </div>

                            <div className="form-group marginBottom15 col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-xs-offset-right-2">

                                <div className="col-sm-3 col-lg-3 col-md-3 pull-right  text-right">
                                    <button type="button" className="btn btn-default  btn-kayak" onClick={this.updateFlight} >Update
                                    </button>
                                </div>
                                <div className="col-sm-9 col-lg-9 col-md-9 pull-right  text-right">

                                    <button type="button" className="btn btn-default sharpCornerForInfoButton" onClick={this.closeUpdateFlight}>Close</button>

                                </div>
                            </div>


                        </Modal.Footer>

                    </Modal>
                </div>

            </div>
        );
    }
}



function mapDispatchToProps(dispatch) {
    return {
        deleteFlightById : (id) => dispatch(deleteFlightById(id)) ,
        updateFlightById: (obj , id ) => dispatch(updateFlightById(obj , id ))
    };
}

function mapStateToProps(state) {
    return {
        listOfFlights : state.flightsReducer.allFlights ,
        flightAddSuccess : state.flightsReducer.flightAddSuccess,
        flightUpdateSuccess : state.flightsReducer.flightUpdateSuccess,
        flightDeleteSuccess : state.flightsReducer.flightDeleteSuccess,
        currentFlightToUpdate : state.flightsReducer.currentFlightToUpdate
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <FlightComponent {...props}/>))