import initialState from './initialState';

const reducer = (state = initialState, action) => {
  	switch (action.type) {
	    /*case "ADD_CAR_SUCCESS" :
	    	return {
	      		...state,
	        	allCars : action.payload,
	        	carAddSuccess : true
	    	};*/
	    	
	    default : 
	      	return state;
  	}
};

export default reducer;
