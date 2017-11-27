import initialState from './initialState';

const reducer = (state = initialState, action) => {
  	switch (action.type) {
	    
  		//Add
	    case "ADD_FLIGHT_SUCCESS" :
	    	return {
	      		...state,
	        	flightAddSuccess : true,
                flightDeleteSuccess : null,
                flightUpdateSuccess : null
	    	};
	    case "ADD_FLIGHT_FAILURE" :  
	   		return {
	      		...state,
	        	flightAddSuccess : false,
                flightDeleteSuccess : null,
                flightUpdateSuccess : null
	    	};

	   	//Get Flights
	    case "GET_ALL_FLIGHT_SUCCESS" :  
	      	return {
	      		...state,
	        	allFlights : action.payload , 
	        	flightAddSuccess : null,
                flightDeleteSuccess : null,
                flightUpdateSuccess : null
	    	};
	    case "GET_ALL_FLIGHT_FAILURE" :  
	      	return {
	      		...state,
	        	flightAddSuccess : null,
                flightDeleteSuccess : null,
                flightUpdateSuccess : null
	    	};

	    // Delete
	    case "DELETE_FLIGHT_SUCCESS" :  
	      	return {
	      		...state,
	        	flightAddSuccess : null,
                flightDeleteSuccess : true,
                flightUpdateSuccess : null
	    	};

	    case "DELETE_FLIGHT_FAILURE" :  
	      	return {
	      		...state,
	      		flightAddSuccess : null,
                flightDeleteSuccess : false,
                flightUpdateSuccess : null
	    	};

	    //Update
	    case "UPDATE_FLIGHT_SUCCESS" :  
	      	return {
	      		...state,
	      		flightAddSuccess : null,
                flightDeleteSuccess : null,
                flightUpdateSuccess : true
	    	};
	    case "UPDATE_FLIGHT_FAILURE" :  
	      	return {
	      		...state,
	      		flightAddSuccess : null,
                flightDeleteSuccess : null,
                flightUpdateSuccess : false
	    	};


	    //additional	
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