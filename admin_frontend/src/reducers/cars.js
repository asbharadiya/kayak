import initialState from './initialState';

const reducer = (state = initialState, action) => {
  	switch (action.type) {
	    case "ADD_CAR_SUCCESS" :
	    	return {
	      		...state,
	        	carAddSuccess : true
	    	};
	     case "SET_BACK_CAR_ADD_SUCCESS" :
	    	return {
	      		...state,
	        	carAddSuccess : false
	    	};
	    case "ADD_CAR_FAILURE" :  
	      	return {
	      		...state,
	        	addCarSuccess:false
	    	};

	    case "GET_ALL_CAR_SUCCESS" :  
	      	return {
	      		...state,
	        	allCars : action.payload
	    	};
	    case "DELETE_CAR_SUCCESS" :  
	      	return {
	      		...state,
	        	carDeleteSuccess : action.payload
	    	};

	    	
	    case "DELETE_CAR_FAILURE" :  
	      	return {
	      		...state,
	      		carDeleteSuccess : action.payload
	    	};
	     case "SET_BACK_CAR_DELETE_SUCCESS" :  
	      	return {
	      		...state,
	      		carDeleteSuccess : null
	    	};
	    case "UPDATE_CAR_SUCCESS" :  
	      	return {
	      		...state,
	      		carUpdateSuccess : action.payload.success,
	      		currentCarToUpdate : action.payload.updatePlainObject
	    	};
	    case "UPDATE_CAR_FAILURE" :  
	      	return {
	      		...state,
	      		carUpdateSuccess : action.payload.success,
	      		currentCarToUpdate : action.payload.updatePlainObject
	    	};
	    case "SET_BACK_CAR_UPDATE_SUCCESS" :  
	      	return {
	      		...state,
	      		carUpdateSuccess : action.payload.success,
	      		currentCarToUpdate : action.payload.updatePlainObject
	    	};
	     case "GET_CAR_TO_UPDATE_SUCCESS" :  
	      	return {
	      		...state,
	      		currentCarToUpdate : action.payload
	    	};
	    	

	    	
	    default : 
	      	return state;
  	}
};

export default reducer;
