import {combineReducers} from 'redux';
import authReducer from './auth';
import carsReducer from './cars';
import flightsReducer from './flights'

const rootReducer = combineReducers({
  	// short hand property names
  	authReducer,
  	carsReducer,
  	flightsReducer
})

export default rootReducer;
