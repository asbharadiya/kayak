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
	        	flightDeleteSuccess : action.payload
	    	};

	    	
	    case "DELETE_FLIGHT_FAILURE" :  
	      	return {
	      		...state,
	      		flightDeleteSuccess : action.payload
	    	};
	    	
	    case "UPDATE_FLIGHT_SUCCESS" :  
	      	return {
	      		...state,
	      		flightUpdateSuccess : action.payload.success,
	      		currentFlightToUpdate : action.payload.updatePlainObject
	    	};
	    case "SET_BACK_FLIGHT_UPDATE_SUCCESS" :  
	      	return {
	      		...state,
	      		flightUpdateSuccess : action.payload.success,
	      		currentFlightToUpdate : action.payload.updatePlainObject
	    	};
	     case "GET_FLIGHT_TO_UPDATE_SUCCESS" :  
	      	return {
	      		...state,
	      		currentFlightToUpdate : action.payload
	    	};
	    case "SET_BACK_FLIGHT_DELETE_SUCCESS" :  
	      	return {
	      		...state,
	      		flightDeleteSuccess : null
	    	};
	    case "SET_BACK_JUST_FLIGHT_UPDATE_SUCCESS" :  
	      	return {
	      		...state,
	      		flightUpdateSuccess : action.payload.success
	    	};	
	    case "UPDATE_FLIGHT_FAILURE" :  
	      	return {
	      		...state,
	      		flightUpdateSuccess : action.payload.success
	    	};
	    	
	    default : 
	      	return state;
  	}
};

export default reducer;
