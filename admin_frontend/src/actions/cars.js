import * as api from '../api/cars';

function addCarSuccess(data) {
  	return {type: "ADD_CAR_SUCCESS" , payload : data}
}

function addCarFailure(){
    return {type: "ADD_CAR_FAILURE"}
}

function deleteCarFailure(){
    return {type: "DELETE_CAR_FAILURE"}
}



export function addCar(payload) {
	return function(dispatch) {
		return api.addCar(payload , function(error , response){
			if(error){
				dispatch(addCarFailure());
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(addCarSuccess(res.data));
					}else{
						dispatch(addCarFailure());
					}
				})
			}
		})
	};
}


export function getAllCars() {
	return function(dispatch) {
		return api.getAllCars(function(error , response){
			if(error){
				dispatch({type: "GET_ALL_CAR_FAILURE" });
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch({type: "GET_ALL_CAR_SUCCESS"  , payload :  res.data});
					}else{
						dispatch({type: "GET_ALL_CAR_FAILURE" });
					}
				})
			}
		})
	};
}



export function setBackCarAddSuccess(){
	return {type: "SET_BACK_CAR_ADD_SUCCESS" , payload : null}
}

export function setBackCarUpdateSuccess(){
	return {type: "SET_BACK_CAR_UPDATE_SUCCESS" , payload : null}
}




function deleteCarSuccess(data) {
  	return {type: "DELETE_CAR_SUCCESS" , payload : data}
}

export function deleteCarById(id) {
	return function(dispatch) {
		return api.deleteCarById(id , function(error , response){
			if(error){
				dispatch( deleteCarFailure()) ;
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(deleteCarSuccess(res.data));
					}else{
						dispatch( deleteCarFailure()) ;
					}
				})
			}
		})
	};
}



function updateCarSuccess(data) {
	return {type: "UPDATE_CAR_SUCCESS" , payload : data}
}

export function updateCarById(obj) {
	return function(dispatch) {
		return api.updateCarById(obj , function(error , response){
			if(error){
				dispatch({type: "UPDATE_CAR_FAILURE"})
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(updateCarSuccess(res.data))
					}else{
						dispatch({type: "UPDATE_CAR_FAILURE"})
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



