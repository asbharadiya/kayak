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

export function getCreditCards() {
    return function(dispatch) {
        return api.getCreditCards().then(response => {
            if(response.status === 200){
                dispatch({type: "GET_CREDIT_CARDS_SUCCESS", payload:response.data});
            } else {
                dispatch({type: "GET_CREDIT_CARDS_FAILURE"});
            }
        }).catch(error => {
            dispatch({type: "GET_CREDIT_CARDS_FAILURE"});
        });
    };
}

export function addCreditCard(payload) {
    return function(dispatch) {
        return api.addCreditCard(payload).then(response => {
            if(response.status === 200){
                dispatch({type: "ADD_CREDIT_CARD_SUCCESS"});
            } else {
                dispatch({type: "ADD_CREDIT_CARD_FAILURE"});
            }
        }).catch(error => {
            dispatch({type: "ADD_CREDIT_CARD_FAILURE"});
        });
    };
}