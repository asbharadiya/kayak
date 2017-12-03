import * as api from '../api/userTracking';

export function getUserAnalytics() {
    return function(dispatch) {
        return api.getUserAnalytics(function(error , response){
            if(error){
                dispatch({type: "GET_USER_ANALYTICS_FAILURE" });
            } else {
                response.then((res) => {
                    if(res.status === 200){
                        dispatch({type: "GET_USER_ANALYTICS_SUCCESS", payload: res.data});
                    }else{
                        dispatch({type: "GET_USER_ANALYTICS_FAILURE"});
                    }
                })
            }
        })
    };
}