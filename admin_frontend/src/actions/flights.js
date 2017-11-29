import * as api from '../api/flights';




// Get all Flights

export function getAllFlights() {
    return function(dispatch) {
        return api.getAllFlights(function(error , response){
            if(error){
                dispatch({type: "GET_ALL_FLIGHT_FAILURE" });
            } else {
                response.then((res) => {
                    if(res.status === 200){
                        dispatch({type: "GET_ALL_FLIGHT_SUCCESS"  , payload :  res.data});
                    }else{
                        dispatch({type: "GET_ALL_FLIGHT_FAILURE" });
                    }
                })
            }
        })
    };
}



// add

export function addFlight(data) {

    return function(dispatch) {
        return api.addFlight(data , function(error , response){
            if(error){
                dispatch({type: "ADD_FLIGHT_FAILURE"});
            } else {
                response.then((res) => {
                    if(res.status === 200){
                        dispatch({type: "ADD_FLIGHT_SUCCESS"});
                    }else{
                        dispatch({type: "ADD_FLIGHT_FAILURE"});
                    }
                })
            }
        })
    };


}









//Delete

export function deleteFlightById(id) {
    return function(dispatch) {
        return api.deleteFlightById(id , function(error , response){
            if(error){
                dispatch({type: "DELETE_FLIGHT_FAILURE"}) ;
            } else {
                response.then((res) => {
                    if(res.status === 200){
                        dispatch({type: "DELETE_FLIGHT_SUCCESS"});
                    }else{
                        dispatch({type: "DELETE_FLIGHT_FAILURE"}) ;
                    }
                })
            }
        })
    };
}




// Update

export function updateFlightById(data , id ) {
	return function(dispatch) {
        return api.updateFlightById(data, id, function (error, response) {
            if (error) {
                dispatch({type: "UPDATE_FLIGHT_FAILURE"})
            } else {
                response.then((res) => {
                    if (res.status === 200) {
                        dispatch({type: "UPDATE_FLIGHT_SUCCESS"})
                    } else {
                        dispatch({type: "UPDATE_FLIGHT_FAILURE"})
                    }
                })
            }
        })
    }
}


