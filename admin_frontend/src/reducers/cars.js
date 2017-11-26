import initialState from './initialState';

const reducer = (state = initialState, action) => {
  	switch (action.type) {
        case "GET_ALL_CAR_SUCCESS" :
            return {
                ...state,
                allCars : action.payload,
                carAddSuccess : null,
                carUpdateSuccess : null,
                carDeleteSuccess : null
            };
        case "GET_ALL_CAR_FAILURE" :
            return {
                ...state,
                carAddSuccess : null,
                carUpdateSuccess : null,
                carDeleteSuccess : null
            };
        case "ADD_CAR_SUCCESS" :
	    	return {
	      		...state,
	        	carAddSuccess : true,
                carUpdateSuccess : null,
                carDeleteSuccess : null
	    	};
		case "ADD_CAR_FAILURE" :
	      	return {
	      		...state,
	        	carAddSuccess: false,
                carUpdateSuccess : null,
                carDeleteSuccess : null
	    	};
	    case "DELETE_CAR_SUCCESS" :
	      	return {
	      		...state,
	        	carDeleteSuccess : true,
                carAddSuccess : null,
                carUpdateSuccess : null
	    	};
	    case "DELETE_CAR_FAILURE" :  
	      	return {
	      		...state,
	      		carDeleteSuccess : false,
                carAddSuccess : null,
                carUpdateSuccess : null
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
	      		carUpdateSuccess : action.payload.success
	    	};
	    case "SET_BACK_CAR_UPDATE_SUCCESS" :  
	      	return {
	      		...state,
	      		carUpdateSuccess : action.payload.success,
	      		currentCarToUpdate : action.payload.updatePlainObject
	    	};
	    case "SET_BACK_JUST_CAR_UPDATE_SUCCESS" :  
	      	return {
	      		...state,
	      		carUpdateSuccess : action.payload.success
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
