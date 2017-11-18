import initialState from './initialState';

const reducer = (state = initialState, action) => {
  	switch (action.type) {
	    case "ADD_HOTEL_SUCCESS" :
	    	return {
	      		...state,
	        	allHotels : action.payload,
	        	hotelAddSuccess : true
	    	};
	     case "SET_BACK_HOTEL_ADD_SUCCESS" :
	    	return {
	      		...state,
	        	hotelAddSuccess : false
	    	};
	    case "ADD_HOTEL_FAILURE" :  
	      	return {
	      		...state,
	        	addHotelSuccess:false
	    	};

	    case "GET_ALL_HOTEL_SUCCESS" :  
	      	return {
	      		...state,
	        	allHotels : action.payload
	    	};
	    case "DELETE_HOTEL_SUCCESS" :  
	      	return {
	      		...state,
	        	allHotels : action.payload
	    	};

	    	
	    case "DELETE_HOTEL_FAILURE" :  
	      	return {
	      		...state
	    	};
	    	
	    case "UPDATE_HOTEL_SUCCESS" :  
	      	return {
	      		...state,
	      		allHotels : action.payload ,
	      		hotelUpdateSuccess : true
	    	};
	    case "SET_BACK_HOTEL_UPDATE_SUCCESS" :  
	      	return {
	      		...state,
	      		hotelUpdateSuccess : null
	    	};
	     case "GET_HOTEL_TO_UPDATE_SUCCESS" :  
	      	return {
	      		...state,
	      		currentHotelToUpdate : action.payload
	    	};
	    	

	    	
	    default : 
	      	return state;
  	}
};

export default reducer;
