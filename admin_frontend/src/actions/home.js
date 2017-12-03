import * as api from '../api/home';

export function getRevenueByType() {
    return function(dispatch) {
        return api.getRevenueByType(function(error , response){
            if(error){
                dispatch({type: "GET_REVENUEBYTYPE_FAILURE" });
            } else {
                response.then((res) => {
                    if(res.status === 200){
                        dispatch({type: "GET_REVENUEBYTYPE_SUCCESS", payload: res.data});
                    }else{
                        dispatch({type: "GET_REVENUEBYTYPE_FAILURE"});
                    }
                })
            }
        })
    };
}

export function getRevenueByCity() {
    return function(dispatch) {
        return api.getRevenueByCity(function(error , response){
            if(error){
                dispatch({type: "GET_REVENUEBYCITY_FAILURE" });
            } else {
                response.then((res) => {
                    if(res.status === 200){
                        dispatch({type: "GET_REVENUEBYCITY_SUCCESS", payload: res.data});
                    }else{
                        dispatch({type: "GET_REVENUEBYCITY_FAILURE"});
                    }
                })
            }
        })
    };
}

export function getRevenueByTopCmpny() {
    return function(dispatch) {
        return api.getRevenueByTopCmpny(function(error , response){
            if(error){
                dispatch({type: "GET_REVENUEBYTOPCMPNY_FAILURE" });
            } else {
                response.then((res) => {
                    if(res.status === 200){
                        dispatch({type: "GET_REVENUEBYTOPCMPNY_SUCCESS", payload: res.data});
                    }else{
                        dispatch({type: "GET_REVENUEBYTOPCMPNY_FAILURE"});
                    }
                })
            }
        })
    };
}