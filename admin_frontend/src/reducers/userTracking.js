import initialState from './initialState';

const reducer = (state = initialState, action) => {
  	switch (action.type) {
        case "GET_USER_ANALYTICS_SUCCESS" :
        	var userAnalytics = [];
        	for (var key in action.payload[0].results.clicksPerPage) {
        		userAnalytics.push({name: key, value: action.payload[0].results.clicksPerPage[key].length});
        	}
        	console.log(userAnalytics);
            return {
                ...state,
                userAnalytics : userAnalytics
            };
        case "GET_USER_ANALYTICS_FAILURE" :
            return {
                ...state,
            };
	    default : 
	      	return state;
  	}
};

export default reducer;
