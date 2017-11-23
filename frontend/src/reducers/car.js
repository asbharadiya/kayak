import initialState from './initialState';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_CUSTOMERS_CAR_SUCCESS" :
            return {...state, allCars : action.payload};
        case "APPLY_CAR_FILTERS" :
           return {...state, getUpdatedFileSuccess : action.payload};

        default :
            return state;
    }
};

export default reducer;
