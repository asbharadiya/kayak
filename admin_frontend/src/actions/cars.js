import * as api from '../api/cars';

function addCarSuccess(data) {
  	return {type: "ADD_CAR_SUCCESS" , payload : data}
}

function addCarFailure(){
    return {type: "ADD_CAR_FAILURE"}
}

/*export function addCar(payload) {
	console.log("Action layload " , payload)
	return function(dispatch) {
		
		return api.addCar(payload).then((response) => {
	    	console.log("Response from server 2 ", response);
	    	if(response.status === 200){
	    		dispatch(addCarSuccess());
	    	} else {
	    		dispatch(addCarFailure());
	    	}
	    }).catch(error => {
	      	dispatch(addCarFailure());
	    });
	};
}
*/


export function addCar(payload) {
	return function(dispatch) {
		return api.addCar(payload , function(error , response){
			if(error){
				dispatch(addCarFailure());
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(addCarSuccess(res.data));
					}else{
						dispatch(addCarFailure());
					}
				})
			}
		})
	};
}