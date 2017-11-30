import initialState from './initialState';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_DATA_SUCCESS" :
            return {...state,profile:action.payload};
        case "USER_DATA_FAILURE" :
            return {...state};
        default :
            return state;
    }
};

export default reducer;
