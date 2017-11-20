import initialState from './initialState';

const reducer = (state = initialState, action) => {
  	switch (action.type) {
	    case "ADD_FLIGHT_SUCCESS" :
	    	return {
	      		...state,
	        	allFlights : action.payload,
	        	flightAddSuccess : true
	    	};
	     case "SET_BACK_FLIGHT_ADD_SUCCESS" :
	    	return {
	      		...state,
	        	flightAddSuccess : false
	    	};
	    case "ADD_FLIGHT_FAILURE" :  
	      	return {
	      		...state,
	        	addFlightSuccess:false
	    	};

	    case "GET_ALL_FLIGHT_SUCCESS" :  
	      	return {
	      		...state,
	        	allFlights : action.payload
	    	};
	    case "DELETE_FLIGHT_SUCCESS" :  
	      	return {
	      		...state,
	        	allFlights : action.payload
	    	};

	    	
	    case "DELETE_FLIGHT_FAILURE" :  
	      	return {
	      		...state
	    	};
	    	
	    case "UPDATE_FLIGHT_SUCCESS" :  
	      	return {
	      		...state,
	      		allFlights : action.payload ,
	      		flightUpdateSuccess : true
	    	};
	    case "SET_BACK_FLIGHT_UPDATE_SUCCESS" :  
	      	return {
	      		...state,
	      		flightUpdateSuccess : null
	    	};
	     case "GET_FLIGHT_TO_UPDATE_SUCCESS" :  
	      	return {
	      		...state,
	      		currentFlightToUpdate : action.payload
	    	};
	    	
	    default : 
	      	return state;
  	}
};

export default reducer;
