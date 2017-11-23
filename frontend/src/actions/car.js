import * as api from '../api/car';



// Get all Cars

export function getAllCars() {
	return function(dispatch) {
		return api.getAllCars(function(error , response){
			if(error){
				dispatch({type: "GET_ALL_CAR_FAILURE" });
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch({type: "GET_ALL_CUSTOMERS_CAR_SUCCESS"  , payload :  res.data});
					}else{
						dispatch({type: "GET_ALL_CUSTOMERS_CAR_FAILURE" });
					}
				})
			}
		})
	};
}






export function applyCarFilter(){
	return {type : 'APPLY_CAR_FILTERS' , payload : false }
}



