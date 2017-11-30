import initialState from './initialState';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_DATA_SUCCESS" :
            return {
            	...state,
            	profile:action.payload,
            	userUpdateSuccess:null
            };
        case "USER_DATA_FAILURE" :
            return {...state};
        case "USER_UPDATE_SUCCESS" :
            return {...state,userUpdateSuccess:true};
        case "USER_UPDATE_FAILURE" :
            return {...state,userUpdateSuccess:false};
        

        default :
            return state;
    }
};

export default reducer;
