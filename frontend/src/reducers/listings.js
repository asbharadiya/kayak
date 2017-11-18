import initialState from './initialState';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_LISTINGS_SUCCESS" :
            return {
                ...state,
                listings : action.data
            };
        default :
            return state;
    }
};

export default reducer;
