import * as api from '../api/hotel';
import * as util from './util';

// Get all hotels
export function getAllHotels(queryParams, filters) {
    var params = "?";
    if(queryParams){
        params += util.toQueryString(queryParams);
    }
    if(filters){
        params += "&";
        params += util.toQueryString(filters);
    }
    return function(dispatch) {
        return api.getAllHotels(params, function(error , response){
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


