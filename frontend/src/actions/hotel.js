import * as api from '../api/hotel';

// Get all hotels
export function getAllHotels() {
    return function(dispatch) {
        return api.getAllHotels(function(error , response){
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


