import initialState from './initialState';

const reducer = (state = initialState, action) => {
  	switch (action.type) {
	    case "GET_ALL_BILL_SUCCESS" :  
	      	return {
	      		...state,
	        	allBills : action.payload,
                billUpdateSuccess : null
	    	};
	    case "GET_BILL_TO_UPDATE_SUCCESS" :  
	      	return {
	      		...state,
	      		currentBillToUpdate : action.payload,
                billUpdateSuccess : null
	    	};
	    default : 
	      	return state;
  	}
};

export default reducer;