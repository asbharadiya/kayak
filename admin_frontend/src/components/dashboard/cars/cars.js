import React, { Component } from 'react';
import './cars.css';
import * as actions from '../../../actions/cars';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import CarComponent  from './carComponent';

//Loading
import Loading from 'react-loading-spinner';


class Cars extends Component {

    constructor(props){
        super(props);
        this.state = {
            carQuantity : 0 ,
            carType : '' ,
            carName : '' ,
            occupancy : '',
            luggage : '' ,
            dailyRentalValue : '',
            serviceStartDate : '' ,
            serviceEndDate : '' ,
            carFile : '' ,
            filename : '',
            //
            addCarError : "" ,
            carAddLoading : false ,
            showCarModal: false
        }
        this.openAddCar = this.openAddCar.bind(this);
        this.closeAddCar = this.closeAddCar.bind(this);
        this.addCar = this.addCar.bind(this);
    }

    componentDidMount(){
        this.props.getAllCars();
    }

    componentWillReceiveProps(newProps) {
        if(  (newProps.carAddSuccess != null && newProps.carAddSuccess) ||
            (newProps.carDeleteSuccess != null && newProps.carDeleteSuccess) ||
            (newProps.carUpdateSuccess != null && newProps.carUpdateSuccess) )
        {
            this.setState({
                carQuantity : 0 ,
                carType : '' ,
                carName : '' ,
                occupancy : '',
                luggage : '' ,
                dailyRentalValue : 0,
                serviceStartDate : '' ,
                serviceEndDate : '',
                carFile : '' ,
                filename : '',
                //
                addCarError : '' ,
                carAddLoading : false ,
                showCarModal : false
            }) ;

            this.props.getAllCars();
        }
        
        if(newProps.carAddSuccess === false){
            this.setState({
                addCarError : 'Error occured while adding the car' ,
                carAddLoading : false
            })
        }

    }

    openAddCar(){
        this.setState({
            carQuantity : 0 ,
            carType : '' ,
            carName : '' ,
            occupancy : '',
            luggage : '' ,
            dailyRentalValue : '',
            serviceStartDate : '' ,
            serviceEndDate : '' ,
            carFile : '' ,
            filename : '',
            //
            addCarError : "" ,
            carAddLoading : false ,
            showCarModal : true
        })
    }

    closeAddCar(){
        this.setState({
            showCarModal : false
        })
    }

    addCar(){
        var startDate = new Date(this.state.serviceStartDate);
        startDate.setDate(startDate.getDate() + 1);
        var endDate = new Date(this.state.serviceEndDate);
        endDate.setDate(endDate.getDate() + 1);

        if(this.state.carType === '' ){
            this.setState({ addCarError : "Please select Car Type"})
            return ;
        }
        if(this.state.carName === '' ){
            this.setState({ addCarError : "Please enter Car Name"})
            return ;
        }
        if(this.state.occupancy === '' ){
            this.setState({ addCarError : "Please select number of occupants"})
            return ;
        }
        if(this.state.carQuantity === 0 ){
            this.setState({ addCarError : "Specify number of cars to add"})
            return ;
        }
        if(this.state.serviceStartDate === ''){
            this.setState({ addCarError : "Please enter service start date"})
            return
        }

        if(this.state.serviceEndDate === ''){
            this.setState({ addCarError : "Please enter service end date"})
            return
        }
        if(startDate <= new Date())	{
            this.setState({ addCarError : "Service Start Date should be a future date"})
            return
        }
        if(endDate <= new Date())	{
            this.setState({ addCarError : "Service End Date should be a future date"})
            return
        }

        if(endDate <= startDate){

            this.setState({ addCarError : "Service End Date should be a greater than start date"})
            return
        }
        if(endDate <= startDate.setDate(startDate.getDate() + 14)){
            this.setState({ addCarError : "Service provided should not be less than 15 days"})
            return ;
        }
        if(this.state.luggage === '' ){
            this.setState({ addCarError : "Please specify luggage allowed or not"})
            return ;
        }
        if(this.state.dailyRentalValue === false ){
            this.setState({ addCarError : "Please specify daily rental value for the car"})
            return ;
        }

        var obj = {
            carQuantity : this.state.carQuantity ,
            carType : this.state.carType ,
            carName : this.state.carName ,
            occupancy : this.state.occupancy,
            luggage : this.state.luggage ,
            dailyRentalValue : this.state.dailyRentalValue,
            serviceStartDate : this.state.serviceStartDate,
            serviceEndDate : this.state.serviceEndDate
        }

        this.setState({
            addCarError : '' ,
            carAddLoading : true
        })
        
        this.props.addCar(obj , this.state.carFile )
    }


    render() {
        console.log("Loading " , this.state.carAddLoading) ; 
        return (
			<div className="row car-content">
				<div className="col-lg-12 col-sm-12 col-md-12 addButtonDiv text-right">
					<button className="btn btn-primary btn-kayak" onClick={this.openAddCar}>Add Car</button>
				</div>

				<Modal show={this.state.showCarModal} id="carModal" className="carModal">
					<Modal.Body className="carModalBody">
                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">
                            <label htmlFor="carType">Car Type</label>
                            <select onChange={(e) => {
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
                            <input className="form-control sharpCorner" onChange={(e) => {
                                this.setState({
                                    carName : e.target.value
                                })
                            }} id="carname" type="text"  aria-describedby="basic-addon1"   />
                        </div>


                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">
                            <label htmlFor="carname">Upload</label>
                            <div className="input-group image-preview">

                                <input type="text" value={this.state.filename} className="form-control image-preview-filename" disabled="disabled" />
                                <span className="input-group-btn">


						                	{
                                                this.state.carFile === '' ?
                                                    <span></span>
                                                    :
                                                    <button type="button"  onClick={() => {
                                                        this.setState({carFile : '' , filename : ''})
                                                    }} className="btn btn-default image-preview-clear" >
                                                        <span className="glyphicon glyphicon-remove"></span> Clear
                                                    </button>
                                            }



                                    <div className="btn btn-default image-preview-input">
						                        <span className="glyphicon glyphicon-folder-open"></span>
						                        <span className="image-preview-input-title"></span> Browse
						                        <input type="file" onChange={(e) => {
                                                    var file = e.target.files[0];


                                                    if(file === undefined){
                                                        return ;
                                                    }

                                                    this.setState({ carFile : file , filename : file.name})

                                                }} accept="image/png, image/jpeg, image/gif" name="input-file-preview"/>
						                    </div>

						                </span>

                            </div>
                        </div>

                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">
                            <label htmlFor="maxpeople">Occupancy</label>
                            <select onChange={(e) => {
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
                            <input className="form-control sharpCorner" id="carid" type="number"  onChange={(e) => {
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
                        </div>
                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">
                            <label htmlFor="serviceAvailable">Service End Date</label>
                            <input className="form-control  sharpCorner" id="serviceAvailable" type="date"  onChange={(e) => {
                                this.setState({
                                    serviceEndDate : e.target.value
                                })
                            }} aria-describedby="basic-addon1"   />
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
                            <input type="number" onChange={(e) => {
                                this.setState({
                                    dailyRentalValue : e.target.value
                                })
                            }} className="form-control"  aria-describedby="basic-addon1" required />
                        </div>

					</Modal.Body>
					<Modal.Footer className="carModalFooter">
						<div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8 text-right">
                           <Loading isLoading={this.state.carAddLoading} ></Loading>
						</div>


						<div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8 text-right carAddErrorText">
                            {this.state.addCarError}

						</div>


						<div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8 text-right">

                            <button type="button" className="btn btn-default btn-kayak btn-kayak-default" onClick={this.closeAddCar}>Close</button>
                            <button type="button" className="btn btn-primary btn-kayak" onClick={this.addCar} >Submit
                            </button>
						</div>

					</Modal.Footer>
				</Modal>


				<div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 divForHeaders">
					<div className="row listHeader">

						<div className="col-md-9 col-sm-9 col-lg-9 col-xs-9 dataDiv">
							<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
								<b>Car Name</b>
							</div>
							<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
								<b>Type</b>
							</div>
							<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
								<b># of Cars/day</b>
							</div>
							<div className="col-md-3 col-sm-3 col-lg-3 col-xs-3">
								<b>Rental Value</b>
							</div>
						</div>

					</div>


                    {
                        this.props.listOfCars.map((car , key) => {
                            return <CarComponent car={car}  key={key}> </CarComponent>
                        })
                    }
				</div>
			</div>

        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        addCar : (params , file ) => dispatch(actions.addCar(params , file)) ,
        getAllCars : () => dispatch(actions.getAllCars())
    };
}

function mapStateToProps(state) {
    return {
        listOfCars : state.carsReducer.allCars ,
        carAddSuccess : state.carsReducer.carAddSuccess,
        carDeleteSuccess : state.carsReducer.carDeleteSuccess,
        carUpdateSuccess : state.carsReducer.carUpdateSuccess
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <Cars {...props}/>));
