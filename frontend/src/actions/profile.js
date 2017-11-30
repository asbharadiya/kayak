import * as api from '../api/profile';

function checkUserSuccess(data) {
  	return {type: "USER_DATA_SUCCESS",payload: data}
}

function checkUserFailure(){
    return {type: "USER_DATA_FAILURE"}
}


export function getUserDetails() {
	return function(dispatch) {
	    return api.getUserDetails().then(response => {
	    	console.log('Inside react ' + response)
	    	console.log(response)
	    	if(response.status === 200){
	    		console.log('200')
	    		dispatch(checkUserSuccess(response.data));
	    	} else {
	    		dispatch(checkUserFailure());
	    	}
	    }).catch(error => {
	      	dispatch(checkUserFailure());
	    }); 
	};
}