import {combineReducers} from 'redux';
import authReducer from './auth';
import listingsReducer from './listings';
import carsReducer from './car';

const rootReducer = combineReducers({
    // short hand property names
    authReducer,
    listingsReducer,
    carsReducer
})

export default rootReducer;
