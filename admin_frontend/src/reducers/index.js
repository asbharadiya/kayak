import {combineReducers} from 'redux';
import authReducer from './auth';
import carsReducer from './cars';

const rootReducer = combineReducers({
  	// short hand property names
  	authReducer,
  	carsReducer
})

export default rootReducer;
