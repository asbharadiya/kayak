import * as api from '../api/cars';

function addCarSuccess() {
  	return {type: "ADD_CAR_SUCCESS"}
}

function addCarFailure(){
    return {type: "ADD_CAR_FAILURE"}
}

export function addCar(payload) {
	return function(dispatch) {
		return api.addCar(payload).then(response => {
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