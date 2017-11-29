import initialState from './initialState';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_LISTINGS_SUCCESS" :
            return {
                ...state,
                listings : action.payload
            };
        case "GET_LISTINGS_FAILURE" :
            return {
                ...state
            };
        case "CLEAR_LISTINGS_FROM_STORE" :
            return {
                ...state,
                listings : []
            };
        default :
            return state;
    }
};

export default reducer;
