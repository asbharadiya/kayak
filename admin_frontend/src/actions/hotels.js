import * as api from '../api/hotels';

export function addHotel(payload, file) {
	let data = new FormData();
    data.append('file', file);
    data.append('hotelName' , payload.hotelName) ;
    data.append('hotelAddress' , payload.hotelAddress) ;
    data.append('hotelCity' , payload.hotelCity) ;
    data.append('hotelState' , payload.hotelState) ;
    data.append('hotelZip' , payload.hotelZip) ;
    data.append('hotelStar' , payload.hotelStar) ;
    data.append('hotelPhoneNumber' , payload.hotelPhoneNumber) ;
    data.append('hotelEmail' , payload.hotelEmail) ;
    data.append('hotelRating' , payload.hotelRating) ;
    data.append('hotelRooms' , JSON.stringify(payload.hotelRooms)) ;
    data.append('serviceStartDate' , payload.serviceStartDate) ;
    data.append('serviceEndDate' , payload.serviceEndDate) ;
    data.append('amenities' , payload.amenities);
    
	return function(dispatch) {
		return api.addHotel(data , function(error , response){
			if(error){
				dispatch({type: "ADD_HOTEL_FAILURE"});
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch({type: "ADD_HOTEL_SUCCESS" , payload : res.data})
					}else{
						dispatch({type: "ADD_HOTEL_FAILURE"})
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

export function deleteHotelById(id) {
	return function(dispatch) {
		return api.deleteHotelById(id , function(error , response){
			if(error){
				dispatch({type : 'DELETE_HOTEL_FAILURE'})
			} else {
				response.then((res) => {
					if(res.status === 200){
                        dispatch({type : 'DELETE_HOTEL_SUCCESS'})
                    }else{
                        dispatch({type : 'DELETE_HOTEL_FAILURE'})
                    }
				})
			}
		})
	};
}

var updatePlainObject =  {
	hotelName : '' ,
	hotelAddress : '',
	hotelCity : '',
	hotelState : '',
	hotelZip : '',
	hotelStar : '',
	hotelPhoneNumber : '',
	hotelEmail : '',
	hotelRating : '',
	serviceStartDate : '' ,
	serviceEndDate : '',
	addHotelError : "" ,
	showHotelModal: false,
	hotelAddLoading : false ,
	hotelRooms:[],
    hotelFile : '' ,
    filename : ''
}

export function updateHotelById(payload, id , file) {
	let data = new FormData();

	data.append('file', file);
    data.append('hotelName' , payload.hotelName) ;
    data.append('hotelAddress' , payload.hotelAddress) ;
    data.append('hotelCity' , payload.hotelCity) ;
    data.append('hotelState' , payload.hotelState) ;
    data.append('hotelZip' , payload.hotelZip) ;
    data.append('hotelStar' , payload.hotelStar) ;
    data.append('hotelPhoneNumber' , payload.hotelPhoneNumber) ;
    data.append('hotelEmail' , payload.hotelEmail) ;
    data.append('hotelRating' , payload.hotelRating) ;
    data.append('hotelRooms' , JSON.stringify(payload.hotelRooms)) ;
    data.append('serviceStartDate' , payload.serviceStartDate) ;
    data.append('serviceEndDate' , payload.serviceEndDate) ;
    data.append('_id' , id) ;
    data.append('amenities' , payload.amenities);
    
	return function(dispatch) {
		return api.updateHotelById(data , id , function(error , response){
			if(error){
				dispatch({type: "UPDATE_HOTEL_FAILURE"})
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch({type: "UPDATE_HOTEL_SUCCESS" , payload : {success : true , updatePlainObject : updatePlainObject }})
					}else{
						dispatch({type: "UPDATE_HOTEL_FAILURE", payload : {success : false  }})
					}
				})
			}
		})
	};
}

export function getHotelById(id) {
	return function(dispatch) {
		return api.getHotelById(id , function(error , response){
			if(error){
				dispatch({type: "GET_HOTEL_TO_UPDATE_FAILURE" , payload : null})
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch({type: "GET_HOTEL_TO_UPDATE_SUCCESS" , payload : res.data})
					}else{
						dispatch({type: "GET_HOTEL_TO_UPDATE_FAILURE" , payload : null})
					}
				})
			}
		})
	};
}