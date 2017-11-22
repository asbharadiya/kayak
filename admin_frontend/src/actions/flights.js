import * as api from '../api/flights';




// Get all Flights

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



// add

function addFlightSuccess(data) {
  	return {type: "ADD_FLIGHT_SUCCESS" , payload : true}
}

function addFlightFailure(){
    return {type: "ADD_FLIGHT_FAILURE" , payload : false}
}


export function setBackFlightAddSuccess(){
	return {type: "SET_BACK_FLIGHT_ADD_SUCCESS" , payload : null}
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









//Delete

function deleteFlightSuccess() {
  	return {type: "DELETE_FLIGHT_SUCCESS" , payload : true}
}

function deleteFlightFailure(){
    return {type: "DELETE_FLIGHT_FAILURE" , payload : false}
}

export function setBackFlightDeleteSuccess(){
    return {type: "SET_BACK_FLIGHT_DELETE_SUCCESS"}
}


export function deleteFlightById(id) {
	return function(dispatch) {
		return api.deleteFlightById(id , function(error , response){
			if(error){
				dispatch( deleteFlightFailure()) ;
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(deleteFlightSuccess());
					}else{
						dispatch( deleteFlightFailure()) ;
					}
				})
			}
		})
	};
}




// Update


var updatePlainObject =  {
  							flightNumber : '' ,
			                airline : '' ,
			                source : '' ,
			                destination : '',
			                arrival : '' ,
			                departure : '',
			                serviceStartDate : '',
			                serviceEndDate : '',
			                class : '',
			                price : 0,
			                seats : 0,
  						}


function updateFlightSuccess() {
	return {type: "UPDATE_FLIGHT_SUCCESS" , payload : {success : true , updatePlainObject : updatePlainObject }}
}

function updateFlightFailure() {
	return {type: "UPDATE_FLIGHT_FAILURE" , payload : {success : false  }}; 
}


export function setBackJustUpdateVariable() {
	return {type: "SET_BACK_JUST_FLIGHT_UPDATE_SUCCESS" , payload : {success : null  }}; 
}

export function setBackFlightUpdateSuccess(){
	return {type: "SET_BACK_FLIGHT_UPDATE_SUCCESS" , payload : {success : null , updatePlainObject : updatePlainObject }}
}



export function updateFlightById(obj) {
	return function(dispatch) {
		return api.updateFlightById(obj , function(error , response){
			if(error){
				dispatch(updateFlightFailure())
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(updateFlightSuccess())
					}else{
						dispatch(updateFlightFailure())
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



