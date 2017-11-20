import * as api from '../api/flights';

function addFlightSuccess(data) {
  	return {type: "ADD_FLIGHT_SUCCESS" , payload : data}
}

function addFlightFailure(){
    return {type: "ADD_FLIGHT_FAILURE"}
}

function deleteFlightFailure(){
    return {type: "DELETE_FLIGHT_FAILURE"}
}



export function addFlight(payload) {
	return function(dispatch) {
		return api.addFlight(payload , function(error , response){
			if(error){
				dispatch(addFlightFailure());
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(addFlightSuccess(res.data));
					}else{
						dispatch(addFlightFailure());
					}
				})
			}
		})
	};
}


export function getAllFlights() {
	return function(dispatch) {
		return api.getAllFlights(function(error , response){
			if(error){
				dispatch({type: "GET_ALL_FLIGHT_FAILURE" });
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch({type: "GET_ALL_FLIGHT_SUCCESS"  , payload :  res.data});
					}else{
						dispatch({type: "GET_ALL_FLIGHT_FAILURE" });
					}
				})
			}
		})
	};
}



export function setBackFlightAddSuccess(){
	return {type: "SET_BACK_FLIGHT_ADD_SUCCESS" , payload : null}
}

export function setBackFlightUpdateSuccess(){
	return {type: "SET_BACK_FLIGHT_UPDATE_SUCCESS" , payload : null}
}




function deleteFlightSuccess(data) {
  	return {type: "DELETE_FLIGHT_SUCCESS" , payload : data}
}

export function deleteFlightById(id) {
	return function(dispatch) {
		return api.deleteFlightById(id , function(error , response){
			if(error){
				dispatch( deleteFlightFailure()) ;
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(deleteFlightSuccess(res.data));
					}else{
						dispatch( deleteFlightFailure()) ;
					}
				})
			}
		})
	};
}



function updateFlightSuccess(data) {
	return {type: "UPDATE_FLIGHT_SUCCESS" , payload : data}
}

export function updateFlightById(obj) {
	return function(dispatch) {
		return api.updateFlightById(obj , function(error , response){
			if(error){
				dispatch({type: "UPDATE_FLIGHT_FAILURE"})
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(updateFlightSuccess(res.data))
					}else{
						dispatch({type: "UPDATE_FLIGHT_FAILURE"})
					}
				})
			}
		})
	};
}


function getFlightByIDSuccess(data){
	
	return {type: "GET_FLIGHT_TO_UPDATE_SUCCESS" , payload : data}
}

export function getFlightById(id) {
	return function(dispatch) {
		return api.getFlightById(id , function(error , response){
			if(error){
				dispatch({type: "GET_FLIGHT_TO_UPDATE_FAILURE" , payload : null})
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(getFlightByIDSuccess(res.data[0]))
					}else{
						dispatch({type: "GET_FLIGHT_TO_UPDATE_FAILURE" , payload : null})
					}
				})
			}
		})
	};
}



