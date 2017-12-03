import initialState from './initialState';

const reducer = (state = initialState, action) => {
  	switch (action.type) {
	    case "GET_ALL_CUSTOMER_SUCCESS" :  
	      	return {
	      		...state,
	        	allCustomers : action.payload,
                customerDeleteSuccess:null
	    	};
        case "GET_ALL_CUSTOMER_FAILURE" :
            return {
                ...state,
                allCustomers : [],
                customerDeleteSuccess:null
            };
	    case "DELETE_CUSTOMER_SUCCESS" :  
	      	return {
	      		...state,
                customerDeleteSuccess : true
	    	};
	    case "DELETE_CUSTOMER_FAILURE" :  
	      	return {
	      		...state,
                customerDeleteSuccess:false
	    	};
	    default : 
	      	return state;
  	}
};

export default reducer;