import * as api from '../api/bills';

export function getAllBills() {
	return function(dispatch) {
		return api.getAllBills(function(error , response){
			if(error){
				dispatch({type: "GET_ALL_BILL_FAILURE" });
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch({type: "GET_ALL_BILL_SUCCESS"  , payload :  res.data});
					}else{
						dispatch({type: "GET_ALL_BILL_FAILURE" });
					}
				})
			}
		})
	};
}

export function getBillById(id) {
	return function(dispatch) {
		return api.getBillById(id , function(error , response){
			if(error){
				dispatch({type: "GET_BILL_TO_UPDATE_FAILURE" , payload : null})
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch({type: "GET_BILL_TO_UPDATE_SUCCESS" , payload : res.data})
					}else{
						dispatch({type: "GET_BILL_TO_UPDATE_FAILURE" , payload : null})
					}
				})
			}
		})
	};
}