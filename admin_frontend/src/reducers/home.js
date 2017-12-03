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
        	orderByTypeStr = orderByTypeStr.replace(/totalAmount/g, 'value');
        	var orderByTypeObj = JSON.parse(orderByTypeStr);
        	
        	var userCount = [];
        	userCount.push({name: "User Registred", value: action.payload.userCount});
        	userCount.push({name: "Visitors", value: action.payload.userCount*2});
        	
            return {
                ...state,
                revenueByType : revenueByTypeObj,
                orderByType : orderByTypeObj,
                totalRevenue : totalRevenue,
                totalOrders : totalOrders,
                userCount : userCount
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
        	var revenueYrObj, revenueByTopCmpnyMonthObj;
        	if(action.payload && action.payload.revenueYr){
	        	var revenueYrStr = JSON.stringify(action.payload.revenueYr);
	        	revenueYrStr = revenueYrStr.replace(/_id/g, 'name');
	        	revenueYrObj = JSON.parse(revenueYrStr);
        	}
        	if(action.payload && action.payload.revenueMonth){
	        	var revenueByTopCmpnyMonthStr = JSON.stringify(action.payload.revenueMonth);
	        	revenueByTopCmpnyMonthStr = revenueByTopCmpnyMonthStr.replace(/_id/g, 'name');
	        	revenueByTopCmpnyMonthObj = JSON.parse(revenueByTopCmpnyMonthStr);
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
