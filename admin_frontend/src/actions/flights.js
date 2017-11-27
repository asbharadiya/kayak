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

export function addFlight(payload, file ) {

	 let data = new FormData();


    data.append('file', file);

	data.append('flightNumber' , payload.flightNumber) ;
    data.append('airline' , payload.airline) ;
    data.append('source' , payload.source) ;
    data.append('destination' , payload.destination) ;
    data.append('arrival' , payload.arrival) ;
    data.append('departure' , payload.departure) ;
    data.append('serviceStartDate' , payload.serviceStartDate) ;
    data.append('serviceEndDate' , payload.serviceEndDate) ;
	data.append('firstClassPrice' , payload.firstClassPrice) ;
    data.append('firstClassSeats' , payload.firstClassSeats) ;
    data.append('economyClassPrice' , payload.economyClassPrice) ;
    data.append('economyClassSeats' , payload.economyClassSeats) ;
    data.append('businessClassPrice' , payload.businessClassPrice) ;
    data.append('businessClassSeats' , payload.businessClassSeats) ;
    
	
	return function(dispatch) {
		return api.addFlight(data , function(error , response){
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
  	return {type: "DELETE_FLIGHT_SUCCESS"}
}

function deleteFlightFailure(){
    return {type: "DELETE_FLIGHT_FAILURE"}
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

function updateFlightSuccess() {
	return {type: "UPDATE_FLIGHT_SUCCESS" }
}

function updateFlightFailure() {
	return {type: "UPDATE_FLIGHT_FAILURE" }; 
}


export function updateFlightById(payload , id , file ) {

	let data = new FormData();

	data.append('file', file);
    data.append('_id' , payload._id) ;
	data.append('flightNumber' , payload.flightNumber) ;
    data.append('airline' , payload.airline) ;
    data.append('source' , payload.source) ;
    data.append('destination' , payload.destination) ;
    data.append('arrival' , payload.arrival) ;
    data.append('departure' , payload.departure) ;
    data.append('serviceStartDate' , payload.serviceStartDate) ;
    data.append('serviceEndDate' , payload.serviceEndDate) ;
	data.append('firstClassPrice' , payload.firstClassPrice) ;
    data.append('firstClassSeats' , payload.firstClassSeats) ;
    data.append('economyClassPrice' , payload.economyClassPrice) ;
    data.append('economyClassSeats' , payload.economyClassSeats) ;
    data.append('businessClassPrice' , payload.businessClassPrice) ;
    data.append('businessClassSeats' , payload.businessClassSeats) ;
    
    return function(dispatch) {
		return api.updateFlightById(data , id , function(error , response){
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



// get Single Flight

function getFlightByIDSuccess(data){
	return {type: "GET_FLIGHT_TO_UPDATE_SUCCESS" , payload : data}
}

function getFlightByIDFailure(){
	return {type: "GET_FLIGHT_TO_UPDATE_FAILURE" }
}


export function getFlightById(id) {
	return function(dispatch) {
		return api.getFlightById(id , function(error , response){
			if(error){
				dispatch(getFlightByIDFailure())
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(getFlightByIDSuccess(res.data[0]))
					}else{
						dispatch(getFlightByIDFailure())
					}
				})
			}
		})
	};
}



