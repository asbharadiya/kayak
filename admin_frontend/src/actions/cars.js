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