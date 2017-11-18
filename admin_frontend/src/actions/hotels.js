import * as api from '../api/hotels';

function addHotelSuccess(data) {
  	return {type: "ADD_HOTEL_SUCCESS" , payload : data}
}

function addHotelFailure(){
    return {type: "ADD_HOTEL_FAILURE"}
}

function deleteHotelFailure(){
    return {type: "DELETE_HOTEL_FAILURE"}
}



export function addHotel(payload) {
	return function(dispatch) {
		return api.addHotel(payload , function(error , response){
			if(error){
				dispatch(addHotelFailure());
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(addHotelSuccess(res.data));
					}else{
						dispatch(addHotelFailure());
					}
				})
			}
		})
	};
}


export function getAllHotels() {
	return function(dispatch) {
		return api.getAllHotels(function(error , response){
			if(error){
				dispatch({type: "GET_ALL_HOTEL_FAILURE" });
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch({type: "GET_ALL_HOTEL_SUCCESS"  , payload :  res.data});
					}else{
						dispatch({type: "GET_ALL_HOTEL_FAILURE" });
					}
				})
			}
		})
	};
}



export function setBackHotelAddSuccess(){
	return {type: "SET_BACK_HOTEL_ADD_SUCCESS" , payload : null}
}

export function setBackHotelUpdateSuccess(){
	return {type: "SET_BACK_HOTEL_UPDATE_SUCCESS" , payload : null}
}




function deleteHotelSuccess(data) {
  	return {type: "DELETE_HOTEL_SUCCESS" , payload : data}
}

export function deleteHotelById(id) {
	return function(dispatch) {
		return api.deleteHotelById(id , function(error , response){
			if(error){
				dispatch( deleteHotelFailure()) ;
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(deleteHotelSuccess(res.data));
					}else{
						dispatch( deleteHotelFailure()) ;
					}
				})
			}
		})
	};
}



function updateHotelSuccess(data) {
	return {type: "UPDATE_HOTEL_SUCCESS" , payload : data}
}

export function updateHotelById(obj) {
	return function(dispatch) {
		return api.updateHotelById(obj , function(error , response){
			if(error){
				dispatch({type: "UPDATE_HOTEL_FAILURE"})
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(updateHotelSuccess(res.data))
					}else{
						dispatch({type: "UPDATE_HOTEL_FAILURE"})
					}
				})
			}
		})
	};
}


function getHotelByIDSuccess(data){
	
	return {type: "GET_HOTEL_TO_UPDATE_SUCCESS" , payload : data}
}

export function getHotelById(id) {
	return function(dispatch) {
		return api.getHotelById(id , function(error , response){
			if(error){
				dispatch({type: "GET_HOTEL_TO_UPDATE_FAILURE" , payload : null})
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(getHotelByIDSuccess(res.data[0]))
					}else{
						dispatch({type: "GET_HOTEL_TO_UPDATE_FAILURE" , payload : null})
					}
				})
			}
		})
	};
}



