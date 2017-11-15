import initialState from './initialState';

const reducer = (state = initialState, action) => {
  	switch (action.type) {
	    case "ADD_CAR_SUCCESS" :
	    console.log("In Reducer " , action.payload)
	     	return {
	      		...state,
	        	addCarSuccess:true,
	        	allCars : action.payload
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
