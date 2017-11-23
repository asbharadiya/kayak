import initialState from './initialState';

const reducer = (state = initialState, action) => {
  	switch (action.type) {
	    case "ADD_FLIGHT_SUCCESS" :
	    	return {
	      		...state,
	        	flightAddSuccess : true
	    	};
	     case "SET_BACK_FLIGHT_ADD_SUCCESS" :
	    	return {
	      		...state,
	        	flightAddSuccess : action.payload
	    	};
	    case "ADD_FLIGHT_FAILURE" :  
	    console.log("Flight add failure " , action.payload)
	      	return {
	      		...state,
	        	flightAddSuccess: action.payload
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
	     case "SET_BACK_FLIGHT_DELETE_SUCCESS" :  
	      	return {
	      		...state,
	      		flightDeleteSuccess : null
	    	};
	    case "UPDATE_FLIGHT_SUCCESS" :  
	      	return {
	      		...state,
	      		flightUpdateSuccess : action.payload.success,
	      		currentFlightToUpdate : action.payload.updatePlainObject
	    	};
	    case "UPDATE_FLIGHT_FAILURE" :  
	      	return {
	      		...state,
	      		flightUpdateSuccess : action.payload.success
	    	};
	    case "SET_BACK_FLIGHT_UPDATE_SUCCESS" :  
	      	return {
	      		...state,
	      		flightUpdateSuccess : action.payload.success,
	      		currentFlightToUpdate : action.payload.updatePlainObject
	    	};
	    case "SET_BACK_JUST_FLIGHT_UPDATE_SUCCESS" :  
	      	return {
	      		...state,
	      		flightUpdateSuccess : action.payload.success
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