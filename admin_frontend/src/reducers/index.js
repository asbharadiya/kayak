import {combineReducers} from 'redux';
import authReducer from './auth';
import carsReducer from './cars';
import hotelsReducer from './hotels';

const rootReducer = combineReducers({
  	// short hand property names
  	authReducer,
  	carsReducer,
  	hotelsReducer
})

export default rootReducer;
