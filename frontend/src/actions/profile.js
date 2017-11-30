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

function updateSuccess(data) {
  	return {type: "USER_UPDATE_SUCCESS"}
}

function updateFailure(){
    return {type: "USER_UPDATE_FAILURE"}
}

export function updateUserProfile(payload) {
	console.log(payload)
	return function(dispatch) {
	    return api.updateUserProfile(payload ,  function(error , response){
            if(error){
                dispatch(updateFailure())
            } else {
                response.then((res) => {
                    if(res.status === 200){
                        dispatch(updateSuccess())
                    }else{
                        dispatch(updateFailure())
                    }
                })
            }
        })
	};

}