import * as api from '../api/car';
import * as util from './util';

// Get all Cars
export function getAllCars(queryParams, filters) {
    var params = queryParams;
    if(filters){
        params += "&";
        params += util.toQueryString(filters);
    }
	return function(dispatch) {
		return api.getAllCars(params, function(error , response){
			if(error){
				dispatch({type: "GET_LISTINGS_FAILURE" });
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch({type: "GET_LISTINGS_SUCCESS"  , payload :  res.data});
					}else{
						dispatch({type: "GET_LISTINGS_FAILURE" });
					}
				})
			}
		})
	};
}


