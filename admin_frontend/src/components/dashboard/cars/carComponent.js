import React, { Component } from 'react';
import './carComponent.css';
import { Modal } from 'react-bootstrap';
import * as actions from '../../../actions/cars';
import * as api from '../../../api/cars';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Loading from 'react-loading-spinner';

class CarComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            carQuantity : 0 ,
            carType : '' ,
            carName : '' ,
            occupancy : '',
            luggage : '' ,
            dailyRentalValue : 0,
            serviceStartDate : '' ,
            serviceEndDate : '',
            //
            updateCarError : '' ,
            carUpdateLoading : false ,
            updateErrorMessage : '',
            //
            openDeleteModal : false,
            showCarUpdateModal : false
        }
        this.openUpdateCar = this.openUpdateCar.bind(this);
        this.closeUpdateCar = this.closeUpdateCar.bind(this);
        this.fetchCarData = this.fetchCarData.bind(this);
        this.updateCar = this.updateCar.bind(this);
        this.openDeleteCar = this.openDeleteCar.bind(this);
        this.closeDeleteCar = this.closeDeleteCar.bind(this);
        this.deleteCar = this.deleteCar.bind(this);
    }


    componentWillReceiveProps(newProps) {
        if( (newProps.carDeleteSuccess != null && newProps.carDeleteSuccess) ) {
            this.closeDeleteCar();
        }
        if(newProps.carUpdateSuccess != null && newProps.carUpdateSuccess){
            this.setState({
                carUpdateLoading : false ,
                showCarUpdateModal : false ,
                updateErrorMessage : ''
            }) ;
        }
        if(newProps.carUpdateSuccess === false){
            this.setState({
                carUpdateLoading : false ,
                updateErrorMessage : 'Error occured while updating the car record'
            }) ;
        }
    }

    openUpdateCar(){
        this.setState({
            showCarUpdateModal : true
        })
    }

    closeUpdateCar(){
        this.setState({
            showCarUpdateModal : false
        })
    }

    fetchCarData(){
        var _this = this;
        api.getCarById(this.props.car._id, function(error, response){
            if(error){

            } else {
                response.then((res) => {
                    if(res.status === 200){
                        _this.setState({
                            carQuantity : res.data[0].carQuantity ,
                            carType : res.data[0].carType,
                            carName : res.data[0].carName ,
                            occupancy : res.data[0].occupancy,
                            luggage : res.data[0].luggage ,
                            dailyRentalValue : res.data[0].dailyRentalValue,
                            serviceStartDate : res.data[0].serviceStartDate ,
                            serviceEndDate : res.data[0].serviceEndDate ,
                        })
                    }else{

                    }
                })
            }
        })
    }

    updateCar(){
        var startDate = new Date(this.state.serviceStartDate);
        startDate.setDate(startDate.getDate() + 1);
        var endDate = new Date(this.state.serviceEndDate);
        endDate.setDate(endDate.getDate() + 1);

        if(this.state.carQuantity === '' ){
            this.setState({ updateCarError : "Specify number of cars to add"})
            return ;
        }
        if(this.state.carType === '' ){
            this.setState({ updateCarError : "Please select Car Type"})
            return ;
        }
        if(this.state.carName === '' ){
            this.setState({ updateCarError : "Please enter Car Name"})
            return ;
        }
        if(this.state.occupancy === '' ){
            this.setState({ updateCarError : "Please select number of occupants"})
            return ;
        }
        if(this.state.serviceStartDate === ''){
            this.setState({ updateCarError : "Please enter service start date"})
            return
        }

        if(this.state.serviceEndDate === ''){
            this.setState({ updateCarError : "Please enter service end date"})
            return
        }
        if(startDate <= new Date())	{
            this.setState({ updateCarError : "Service Start Date should be a future date"})
            return
        }
        if(endDate <= new Date())	{
            this.setState({ updateCarError : "Service End Date should be a future date"})
            return
        }

        if(endDate <= startDate){

            this.setState({ updateCarError : "Service End Date should be a greater than start date"})
            return
        }
        if(endDate <= startDate.setDate(startDate.getDate() + 14)){
            this.setState({ updateCarError : "Service provided should not be less than 15 days"})
            return ;
        }
        if(this.state.luggage === '' ){
            this.setState({ updateCarError : "Please specify luggage is allowed or not"})
            return ;
        }
        if(this.state.dailyRentalValue === false ){
            this.setState({ updateCarError : "Please specify daily rental value for the car"})
            return ;
        }

        var obj = {
            carQuantity : this.state.carQuantity ,
            carType : this.state.carType ,
            carName : this.state.carName ,
            occupancy : this.state.occupancy,
            luggage : this.state.luggage ,
            dailyRentalValue : this.state.dailyRentalValue,
            serviceStartDate : this.state.serviceStartDate  ,
            serviceEndDate : this.state.serviceEndDate
        }
        this.setState({ updateCarError : '' , carUpdateLoading : true})

        this.props.updateCarById(obj)
    }

    openDeleteCar(){
        this.setState({
            openDeleteModal : true
        })
    }

    closeDeleteCar(){
        this.setState({
            openDeleteModal : false
        })
    }

    deleteCar(){
        this.props.deleteCarById(this.props.car._id)
    }

    render() {

        return (
            <div className="singleCarComponent">
                <div className="row mainRowDiv">
                    <div className="col-md-9 col-sm-9 col-lg-9 col-xs-9 dataDiv">
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
                    <div className="col-md-3 col-sm-3 col-lg-3 col-xs-3 buttonGroup ">

                        <a><i className="fa fa-pencil-square-o fa-2x updateFontAwesome" aria-hidden="true" onClick={this.openUpdateCar}></i></a>

                        <a className="redIcon"><i className="fa fa-times fa-2x" aria-hidden="true" onClick={this.openDeleteCar}></i></a>

                    </div>

                </div>

                <Modal show={this.state.openDeleteModal}  id="carModal" className="deleteCarModal">

                    <Modal.Body>
                        <b>Are you sure to delete {this.props.car.carName } ?  </b>
                    </Modal.Body>

                    <Modal.Footer className="carDeleteFooter">
                        <button className="btn btn-primary btn-kayak" onClick={this.deleteCar}>YES</button>
                        <button className="btn btn-default btn-kayak btn-kayak-default" onClick={this.closeDeleteCar}>NO</button>
                    </Modal.Footer>

                </Modal>

                <Modal show={this.state.showCarUpdateModal}  id="carModal" className="carModal" onEntered={this.fetchCarData}>
                    <Modal.Body className="carModalBody">
                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">
                            <label htmlFor="carType">Car Type</label>
                            <select value={this.state.carType}  onChange={(e) => {
                                this.setState({
                                    carType : e.target.value
                                })
                            }} className="form-control selectpicker" id="carType">
                                <option  className="selected disabled hidden">Select</option>
                                <optgroup label="All className">
                                    <option>Standard</option>
                                    <option>Premium</option>
                                    <option>Full Size</option>
                                    <option>Luxury</option>
                                </optgroup>
                                <optgroup label="SUV">
                                    <option>Compact SUV</option>
                                    <option>Standard SUV</option>
                                    <option>Intermediate SUV</option>
                                    <option>Full Size SUV</option>
                                </optgroup>

                            </select>
                        </div>

                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">
                            <label htmlFor="carname">Car Name</label>
                            <input value={this.state.carName}  className="form-control sharpCorner" onChange={(e) => {
                                this.setState({
                                    carName : e.target.value
                                })
                            }} id="carname" type="text"  aria-describedby="basic-addon1"   />
                        </div>

                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">
                            <label htmlFor="maxpeople">Occupancy</label>
                            <select value={this.state.occupancy}  onChange={(e) => {
                                this.setState({
                                    occupancy : e.target.value
                                })
                            }}className="form-control selectpicker" id="carType">
                                <option  className="selected disabled hidden">No of Occupants</option>
                                <optgroup label="No of occupants">
                                    <option>2</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>7</option>
                                    <option>8</option>
                                </optgroup>


                            </select>
                        </div>

                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">
                            <label htmlFor="carid">No of Cars to add</label>
                            <input className="form-control sharpCorner" value={this.state.carQuantity} id="carid" type="number"  onChange={(e) => {
                                this.setState({
                                    carQuantity : e.target.value
                                })
                            }} aria-describedby="basic-addon1"   />
                        </div>


                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">
                            <label htmlFor="serviceAvailable">Service Start Date</label>
                            <input className="form-control  sharpCorner" id="serviceAvailable" type="date"  onChange={(e) => {
                                this.setState({
                                    serviceStartDate : e.target.value
                                })
                            }} aria-describedby="basic-addon1"   />
                            <div className="UpdatedDate">{this.state.serviceStartDate}</div>
                        </div>

                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">
                            <label htmlFor="serviceAvailable">Service End Date</label>
                            <input  className="form-control  sharpCorner" id="serviceAvailable" type="date"  onChange={(e) => {
                                this.setState({
                                    serviceEndDate : e.target.value
                                })
                            }} aria-describedby="basic-addon1"   />
                            <div className="UpdatedDate">{this.state.serviceEndDate}</div>
                        </div>



                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">
                            <label htmlFor="luggage">Luggage</label>
                            <div data-toggle="buttons">
                                <label onClick={() => {
                                    this.setState({ luggage : 'YES'  })
                                }}className="btn btn-primary btn-circle btn-md lable-margin">       <input type="radio" name="q1" value="YES"  /><i className="glyphicon glyphicon-ok"></i></label>
                                <label onClick={() => {
                                    this.setState({ luggage : 'NO'  })
                                }}className="btn btn-danger btn-circle btn-md">       <input type="radio" name="q1" value="NO" /><i className="glyphicon glyphicon-remove"></i></label>
                            </div>
                        </div>

                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">
                            <label htmlFor="carname">Daily Rental Value</label>
                            <input type="number" value={this.state.dailyRentalValue} onChange={(e) => {
                                this.setState({
                                    dailyRentalValue : e.target.value
                                })
                            }} className="form-control"  aria-describedby="basic-addon1" required />
                        </div>

                    </Modal.Body>
                    <Modal.Footer className="carModalFooter">
                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8 text-right">
                            <Loading isLoading={this.state.carUpdateLoading} ></Loading>
                        </div>

                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8 carAddErrorText">
                            {this.state.updateCarError}
                            {this.state.updateErrorMessage}
                        </div>


                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">

                            <button type="button" className="btn btn-default btn-kayak btn-kayak-default" onClick={this.closeUpdateCar}>Close</button>
                            <button type="button" className="btn btn-primary btn-kayak" onClick={this.updateCar} >Update</button>
                        </div>

                    </Modal.Footer>
                </Modal>


            </div>
        );
    }
}



function mapDispatchToProps(dispatch) {
    return {
        deleteCarById : (id) => dispatch(actions.deleteCarById(id)) ,
        updateCarById: (obj) => dispatch(actions.updateCarById(obj)) ,
        getCarById : (id) => dispatch(actions.getCarById(id))
    };
}

function mapStateToProps(state) {
    return {
        carUpdateSuccess : state.carsReducer.carUpdateSuccess,
        carDeleteSuccess : state.carsReducer.carDeleteSuccess
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <CarComponent {...props}/>));
