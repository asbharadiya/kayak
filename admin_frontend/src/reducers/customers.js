import initialState from './initialState';

const reducer = (state = initialState, action) => {
  	switch (action.type) {
	    case "GET_ALL_CUSTOMER_SUCCESS" :  
	      	return {
	      		...state,
	        	allCustomers : action.payload
	    	};
	    case "DELETE_CUSTOMER_SUCCESS" :  
	      	return {
	      		...state,
	        	allCustomers : action.payload
	    	};
	    case "DELETE_CUSTOMER_FAILURE" :  
	      	return {
	      		...state
	    	};
	    default : 
	      	return state;
  	}
};

export default reducer;