import initialState from './initialState';

const reducer = (state = initialState, action) => {
  	switch (action.type) {
        case "GET_REVENUEBYTYPE_SUCCESS" :
        	var totalRevenue=0,totalOrders=0;
        	for(var i=0; i<action.payload.revenueByType.length; i++){
        		totalRevenue += action.payload.revenueByType[i].totalAmount;
        		totalOrders += action.payload.revenueByType[i].count;
        	}
        	var revenueByTypeStr = JSON.stringify(action.payload.revenueByType);
        	revenueByTypeStr = revenueByTypeStr.replace(/_id/g, 'name');
        	revenueByTypeStr = revenueByTypeStr.replace(/totalAmount/g, 'value');
        	var revenueByTypeObj = JSON.parse(revenueByTypeStr);

        	var orderByTypeStr = JSON.stringify(action.payload.revenueByType);
        	orderByTypeStr = orderByTypeStr.replace(/_id/g, 'name');
        	orderByTypeStr = orderByTypeStr.replace(/count/g, 'value');
        	var orderByTypeObj = JSON.parse(orderByTypeStr);

        	var userCount = [];
        	userCount.push({name: "User Registred", value: action.payload.userCount});
        	userCount.push({name: "Visitors", value: action.payload.userCount*2});

        	var listingCount = [];
        	listingCount.push({name: "Hotels", value: action.payload.hotelCount});
        	listingCount.push({name: "Cars", value: action.payload.carCount});
        	listingCount.push({name: "Flights", value: action.payload.flightCount});

            return {
                ...state,
                revenueByType : revenueByTypeObj,
                orderByType : orderByTypeObj,
                totalRevenue : totalRevenue,
                totalOrders : totalOrders,
                userCount : userCount,
                listingCount : listingCount
            };
        case "GET_REVENUEBYCITY_SUCCESS" :

        	var revenueByCityStr = JSON.stringify(action.payload);
        	revenueByCityStr = revenueByCityStr.replace(/_id/g, 'name');
        	revenueByCityStr = revenueByCityStr.replace(/totalAmount/g, 'revenue');
        	revenueByCityStr = revenueByCityStr.replace(/count/g, 'orders');
        	var revenueByCityObj = JSON.parse(revenueByCityStr);

	    	return {
	      		...state,
	      		revenueByCity : revenueByCityObj
	    	};
        case "GET_REVENUEBYTOPCMPNY_SUCCESS" :
        	var revenueYrObj=action.payload.revenueYr, revenueByTopCmpnyMonthObj=action.payload.revenueMonth;
        	/*if(action.payload && action.payload.revenueYr){
	        	var revenueYrStr = JSON.stringify(action.payload.revenueYr);
	        	revenueYrStr = revenueYrStr.replace(/_id/g, 'name');
	        	revenueYrObj = JSON.parse(revenueYrStr);
        	}
        	if(action.payload && action.payload.revenueMonth){
	        	var revenueByTopCmpnyMonthStr = JSON.stringify(action.payload.revenueMonth);
	        	revenueByTopCmpnyMonthStr = revenueByTopCmpnyMonthStr.replace(/_id/g, 'name');
	        	revenueByTopCmpnyMonthObj = JSON.parse(revenueByTopCmpnyMonthStr);
        	}*/

        	for(i=0; i<revenueYrObj.length; i++){
        		if(revenueYrObj[i].listingHotelName.length>0){
        			console.log(revenueYrObj[i].listingHotelName[0].hotelName);
        			revenueYrObj[i].name = revenueYrObj[i].listingHotelName[0].hotelName;
        		} else if(revenueYrObj[i].listingCarName.length>0){
        			console.log(revenueYrObj[i].listingCarName);
        			revenueYrObj[i].name = revenueYrObj[i].listingCarName[0].carName;
        		} else if(revenueYrObj[i].listingFlightName.length>0){
        			console.log(revenueYrObj[i].listingFlightName);
        			revenueYrObj[i].name = revenueYrObj[i].listingFlightName[0].airline;
        		}
        	}

	    	return {
	      		...state,
	      		revenueByTopCmpny : revenueYrObj,
	      		revenueByTopCmpnyMonth : revenueByTopCmpnyMonthObj
	    	};
        case "GET_REVENUEBYTYPE_FAILURE" :
        case "GET_REVENUEBYCITY_FAILURE" :
        case "GET_REVENUEBYTOPCMPNY_FAILURE" :
            return {
                ...state,
            };
	    default :
	      	return state;
  	}
};

export default reducer;
