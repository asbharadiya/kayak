import {combineReducers} from 'redux';
import authReducer from './auth';
import listingsReducer from './listings';

const rootReducer = combineReducers({
    // short hand property names
    authReducer,
    listingsReducer
})

export default rootReducer;
