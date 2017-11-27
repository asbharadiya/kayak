import * as api from '../api/car';

// Get all Cars
export function getAllCars() {
	return function(dispatch) {
		return api.getAllCars(function(error , response){
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


