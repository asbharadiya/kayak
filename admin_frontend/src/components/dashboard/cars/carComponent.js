import React, { Component } from 'react';
import './carComponent.css';
import { Modal } from 'react-bootstrap';
import * as actions from '../../../actions/cars';
import * as api from '../../../api/cars';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
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
            showCarUpdateModal : false ,
            filename : '' ,
            carFile : '',
            carCity : '',
            citySearch:''

        }
        this.openUpdateCar = this.openUpdateCar.bind(this);
        this.closeUpdateCar = this.closeUpdateCar.bind(this);
        this.fetchCarData = this.fetchCarData.bind(this);
        this.updateCar = this.updateCar.bind(this);
        this.openDeleteCar = this.openDeleteCar.bind(this);
        this.closeDeleteCar = this.closeDeleteCar.bind(this);
        this.deleteCar = this.deleteCar.bind(this);
    }

    handleCityChange(val,item){
        this.setState({
            citySearch:item.city+', '+item.state,
            carCity:item.city+', '+item.state
        });
    }

    handleCitySearchChange(e,val){
        this.setState({
            citySearch: val,
            carCity:''
        });
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
            showCarUpdateModal : false ,
            updateErrorMessage : ''
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
                            serviceEndDate : res.data[0].serviceEndDate,
                            //filename : res.data[0].images[0] ,
                            carCity : res.data[0].carCity,
                            citySearch:res.data[0].carCity
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

        console.log("Start date and end date " , startDate , endDate)

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
        if(this.state.carCity === ''){
        	this.setState({ updateCarError : "Please enter car city"})
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
            serviceEndDate : this.state.serviceEndDate ,
            carCity : this.state.carCity
        }
        this.setState({ updateCarError : '' , carUpdateLoading : true})

        console.log(this.state)
        this.props.updateCarById(obj , this.props.car._id  , this.state.carFile)
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
        var options = this.props.cities;
        return (
            <div className="singleComponent">
                <div className="row mainRowDiv">
                    <div className="col-md-9 col-sm-9 col-lg-9 col-xs-9">
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

                        <a class="pointer"><i className="fa fa-pencil-square-o fa-lg edit-icon" aria-hidden="true" onClick={this.openUpdateCar}></i></a>
                        <a class="pointer"><i className="fa fa-times fa-lg delete-icon" aria-hidden="true" onClick={this.openDeleteCar}></i></a>

                    </div>

                </div>

                <Modal show={this.state.openDeleteModal}  id="carModal" className="deleteModal">

                    <Modal.Body>
                        <b>Are you sure to delete {this.props.car.carName } ?  </b>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btn btn-primary btn-kayak" onClick={this.deleteCar}>YES</button>
                        <button className="btn btn-default btn-kayak btn-kayak-default" onClick={this.closeDeleteCar}>NO</button>
                    </Modal.Footer>

                </Modal>

                <Modal show={this.state.showCarUpdateModal}  id="carModal" onEntered={this.fetchCarData}>
                    <Modal.Body>
                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">
                            <label htmlFor="carType">Car Type</label>
                            <select value={this.state.carType}  onChange={(e) => {
                                this.setState({
                                    carType : e.target.value
                                })
                            }} className="form-control" id="carType">
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
                            <input value={this.state.carName}  className="form-control" onChange={(e) => {
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
                            <select value={this.state.occupancy}  onChange={(e) => {
                                this.setState({
                                    occupancy : e.target.value
                                })
                            }}className="form-control" id="carType">
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
                            <label htmlFor="carid">No Of Cars To Add</label>
                            <input className="form-control" value={this.state.carQuantity} id="carid" type="number"  onChange={(e) => {
                                this.setState({
                                    carQuantity : e.target.value
                                })
                            }} aria-describedby="basic-addon1"   />
                        </div>


                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">
                            <label htmlFor="serviceAvailable">Service Start Date</label>
                            <input value={this.state.serviceStartDate ? this.state.serviceStartDate.substr(0,10) : this.state.serviceStartDate} className="form-control" id="serviceAvailable" type="date"  onChange={(e) => {
                                this.setState({
                                    serviceStartDate : e.target.value
                                })
                            }} aria-describedby="basic-addon1"   />
                            <div className="UpdatedDate"></div>
                        </div>

                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">
                            <label htmlFor="serviceAvailable">Service End Date</label>
                            <input  value={this.state.serviceEndDate ? this.state.serviceEndDate.substr(0,10) : this.state.serviceEndDate} className="form-control" id="serviceAvailable" type="date"  onChange={(e) => {
                                this.setState({
                                    serviceEndDate : e.target.value
                                })
                            }} aria-describedby="basic-addon1"   />
                            <div className="UpdatedDate"></div>
                        </div>

                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8">
                            <label htmlFor="carCity">Car City</label>
                            <Autocomplete
                                inputProps={{ className: 'form-control'}}
                                wrapperProps={{ className:'react-autocomplete' }}
                                wrapperStyle={{ position: 'relative', display: 'inline-block', width: '100%' }}
                                shouldItemRender={(item, value) =>
                                    value.length > 0 ? (item.city+', '+item.state).toLowerCase().indexOf(value.toLowerCase()) > -1 : false
                                }
                                getItemValue={(item) => item.city+', '+item.state}
                                items={options}
                                renderItem={(item, isHighlighted) =>
                                    <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`} key={item.rank}>
                                        <p>{item.city}, {item.state}</p>
                                    </div>
                                }
                                value={this.state.citySearch}
                                onChange={this.handleCitySearchChange.bind(this)}
                                onSelect={this.handleCityChange.bind(this)}
                                renderMenu={children => (
                                    <div className="menu">
                                        {children}
                                    </div>
                                )}
                                selectOnBlur={true}
                            />
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
                    <Modal.Footer>
                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8 text-right">
                            <Loading isLoading={this.state.carUpdateLoading} ></Loading>
                        </div>

                        <div className="form-group col-md-offset-2 col-lg-offset-2 col-sm-offset-2 col-sm-8 text-right error">
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
        updateCarById: (obj , id , file  ) => dispatch(actions.updateCarById(obj , id , file )) ,
        getCarById : (id) => dispatch(actions.getCarById(id))
    };
}

function mapStateToProps(state) {
    return {
        carUpdateSuccess : state.carsReducer.carUpdateSuccess,
        carDeleteSuccess : state.carsReducer.carDeleteSuccess,
        cities:state.citiesReducer.cities
    };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <CarComponent {...props}/>));
