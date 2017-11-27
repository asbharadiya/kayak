import * as api from '../api/flight';
import * as util from './util';

// Get all flights
export function getAllFlights(queryParams, filters) {
    var params = "?";
    if(queryParams){
        params += util.toQueryString(queryParams);
    }
    if(filters){
        params += util.toQueryString(filters);
    }
    return function(dispatch) {
        return api.getAllFlights(params, function(error , response){
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


