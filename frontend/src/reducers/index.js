import {combineReducers} from 'redux';
import authReducer from './auth';
import listingsReducer from './listings';
import profileReducer from './profile';

const rootReducer = combineReducers({
    // short hand property names
    authReducer,
    listingsReducer,
    profileReducer
})

export default rootReducer;
