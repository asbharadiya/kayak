import initialState from './initialState';

const reducer = (state = initialState, action) => {
  	switch (action.type) {
	    case "ADD_HOTEL_SUCCESS" :
	    	return {
	      		...state,
	        	allHotels : action.payload,
	        	hotelAddSuccess : true,
                hotelUpdateSuccess : null,
                hotelDeleteSuccess : null
	    	};
	    case "ADD_HOTEL_FAILURE" :  
	      	return {
	      		...state,
	        	hotelAddSuccess : false,
                hotelUpdateSuccess : null,
                hotelDeleteSuccess : null
	    	};
	    case "GET_ALL_HOTEL_SUCCESS" :  
	      	return {
	      		...state,
	        	allHotels : action.payload,
	        	hotelAddSuccess : null,
                hotelUpdateSuccess : null,
                hotelDeleteSuccess : null
	    	};
	    case "DELETE_HOTEL_SUCCESS" :  
	      	return {
	      		...state,
	        	hotelAddSuccess : null,
                hotelUpdateSuccess : null,
                hotelDeleteSuccess : true
	    	};
	    case "DELETE_HOTEL_FAILURE" :  
	      	return {
	      		...state,
	        	hotelAddSuccess : null,
                hotelUpdateSuccess : null,
                hotelDeleteSuccess : false
	    	};
	    case "UPDATE_HOTEL_SUCCESS" :  
	      	return {
	      		...state,
	      		hotelUpdateSuccess : true,
	        	hotelAddSuccess : null,
                hotelDeleteSuccess : null
	    	};
	     case "GET_HOTEL_TO_UPDATE_SUCCESS" :  
	      	return {
	      		...state,
	      		currentHotelToUpdate : action.payload,
	        	hotelAddSuccess : null,
                hotelUpdateSuccess : null,
                hotelDeleteSuccess : null
	    	};
	    default : 
	      	return state;
  	}
};

export default reducer;