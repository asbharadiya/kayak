import initialState from './initialState';

const reducer = (state = initialState, action) => {
  	switch (action.type) {
	    case "ADD_CAR_SUCCESS" :
	     	return {
	      		...state,
	        	addCarSuccess:true
	    	};
	    case "ADD_CAR_FAILURE" :  
	      	return {
	      		...state,
	        	addCarSuccess:false
	    	};
	    default : 
	      	return state;
  	}
};

export default reducer;
