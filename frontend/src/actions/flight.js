import * as api from '../api/flight';

// Get all flights
export function getAllFlights() {
    return function(dispatch) {
        return api.getAllFlights(function(error , response){
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


