import initialState from './initialState';

const reducer = (state = initialState, action) => {
  	switch (action.type) {
	    case "ADD_CAR_SUCCESS" :
	    console.log("In Reducer " , action.payload)
	     	return {
	      		...state,
	        	allCars : action.payload,
	        	carAddSuccess : true
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
	        	allCars : action.payload
	    	};

	    	
	    case "DELETE_CAR_FAILURE" :  
	      	return {
	      		...state
	    	};
	    	
	    default : 
	      	return state;
  	}
};

export default reducer;
