import * as api from '../api/customers';

function deleteCustomerFailure(){
    return {type: "DELETE_CUSTOMER_FAILURE"}
}

export function getAllCustomers() {
	return function(dispatch) {
		return api.getAllCustomers(function(error , response){
			if(error){
				dispatch({type: "GET_ALL_CUSTOMER_FAILURE" });
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch({type: "GET_ALL_CUSTOMER_SUCCESS"  , payload :  res.data});
					}else{
						dispatch({type: "GET_ALL_CUSTOMER_FAILURE" });
					}
				})
			}
		})
	};
}

function deleteCustomerSuccess(data) {
  	return {type: "DELETE_CUSTOMER_SUCCESS" , payload : data}
}

export function deleteCustomerById(id) {
	return function(dispatch) {
		return api.deleteCustomerById(id , function(error , response){
			if(error){
				dispatch( deleteCustomerFailure()) ;
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(deleteCustomerSuccess(res.data));
					}else{
						dispatch( deleteCustomerFailure()) ;
					}
				})
			}
		})
	};
}

function getCustomerByIDSuccess(data){
	
	return {type: "GET_CUSTOMER_TO_UPDATE_SUCCESS" , payload : data}
}

export function getCustomerById(id) {
	return function(dispatch) {
		return api.getCustomerById(id , function(error , response){
			if(error){
				dispatch({type: "GET_CUSTOMER_TO_UPDATE_FAILURE" , payload : null})
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(getCustomerByIDSuccess(res.data))
					}else{
						dispatch({type: "GET_CUSTOMER_TO_UPDATE_FAILURE" , payload : null})
					}
				})
			}
		})
	};
}