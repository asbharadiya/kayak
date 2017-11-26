import * as api from '../api/cars';
import axios from 'axios' ;



// Get all Cars
export function getAllCars() {
    return function(dispatch) {
        return api.getAllCars(function(error , response){
            if(error){
                dispatch({type: "GET_ALL_CAR_FAILURE" });
            } else {
                response.then((res) => {
                    if(res.status === 200){
                        dispatch({type: "GET_ALL_CAR_SUCCESS", payload: res.data});
                    }else{
                        dispatch({type: "GET_ALL_CAR_FAILURE"});
                    }
                })
            }
        })
    };
}

//add car
export function addCar(payload , file ) {
    let data = new FormData();

    data.append('file', file);
    data.append('carQuantity' , payload.carQuantity) ;
    data.append('carType' , payload.carType) ;
    data.append('carName' , payload.carName) ;
    data.append('occupancy' , payload.occupancy) ;
    data.append('luggage' , payload.luggage) ;
    data.append('dailyRentalValue' , payload.dailyRentalValue) ;
    data.append('serviceStartDate' , payload.serviceStartDate) ;
    data.append('serviceEndDate' , payload.serviceEndDate) ;

    // return function(dispatch){
    //     axios.post('http://localhost:3002/api/v1/a/cars' , data  )
    //         .then(function (response) {
    //             dispatch({type : 'ADD_CAR_SUCCESS'})
    //         })
    //         .catch(function (error) {
    //             dispatch({type : 'ADD_CAR_FAILURE'})
    //         })
    // }


    return function(dispatch) {
        return api.addCar(data , function(error , response){
            if(error){
                dispatch({type : 'ADD_CAR_FAILURE'})
            } else {
                response.then((res) => {
                    if(res.status === 200){
                        dispatch({type : 'ADD_CAR_SUCCESS'})
                    }else{
                        dispatch({type : 'ADD_CAR_FAILURE'})
                    }
                })
            }
        })
    };
}


//Delete
export function deleteCarById(id) {
    return function(dispatch) {
        return api.deleteCarById(id , function(error , response){
            if(error){
                dispatch({type : 'DELETE_CAR_FAILURE'})
            } else {
                response.then((res) => {
                    if(res.status === 200){
                        dispatch({type : 'DELETE_CAR_SUCCESS'})
                    }else{
                        dispatch({type : 'DELETE_CAR_FAILURE'})
                    }
                })
            }
        })
    };
}




// Update


var updatePlainObject =  {
    carQuantity : 0 ,
    carType : '',
    carName : '',
    occupancy : '',
    luggage : "NO" ,
    dailyRentalValue : 0,
    serviceStartDate : '',
    serviceEndDate : ''
}


function updateCarSuccess() {
    return {type: "UPDATE_CAR_SUCCESS" , payload : {success : true , updatePlainObject : updatePlainObject }}
}

function updateCarFailure() {
    return {type: "UPDATE_CAR_FAILURE" , payload : {success : false  }};
}


export function setBackJustUpdateVariable() {
    return {type: "SET_BACK_JUST_CAR_UPDATE_SUCCESS" , payload : {success : null  }};
}

export function setBackCarUpdateSuccess(){
    return {type: "SET_BACK_CAR_UPDATE_SUCCESS" , payload : {success : null , updatePlainObject : updatePlainObject }}
}



export function updateCarById(obj) {
    return function(dispatch) {
        return api.updateCarById(obj , function(error , response){
            if(error){
                dispatch(updateCarFailure())
            } else {
                response.then((res) => {
                    if(res.status === 200){
                        dispatch(updateCarSuccess())
                    }else{
                        dispatch(updateCarFailure())
                    }
                })
            }
        })
    };
}


function getCarByIDSuccess(data){

    return {type: "GET_CAR_TO_UPDATE_SUCCESS" , payload : data}
}

export function getCarById(id) {
    return function(dispatch) {
        return api.getCarById(id , function(error , response){
            if(error){
                dispatch({type: "GET_CAR_TO_UPDATE_FAILURE" , payload : null})
            } else {
                response.then((res) => {
                    if(res.status === 200){
                        dispatch(getCarByIDSuccess(res.data[0]))
                    }else{
                        dispatch({type: "GET_CAR_TO_UPDATE_FAILURE" , payload : null})
                    }
                })
            }
        })
    };
}



