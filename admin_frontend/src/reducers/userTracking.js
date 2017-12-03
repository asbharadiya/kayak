import initialState from './initialState';

const reducer = (state = initialState, action) => {
  	switch (action.type) {
        case "GET_USER_ANALYTICS_SUCCESS" :
            return {
                ...state,
                userAnalyticsPageClicks : action.payload.userAnalyticsPageClicks,
                userAnalyticsListingViewCar : action.payload.userAnalyticsListingViewCar,
                userAnalyticsListingViewHotel : action.payload.userAnalyticsListingViewHotel,
                userAnalyticsListingViewFlight : action.payload.userAnalyticsListingViewFlight,
                userActivityTracking : action.payload.userActivityTracking
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
