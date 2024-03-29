import {combineReducers} from 'redux';
import authReducer from './auth';
import carsReducer from './cars';
import flightsReducer from './flights'
import hotelsReducer from './hotels';
import customersReducer from './customers';
import billsReducer from './bills';
import homeReducer from './home';
import userTrackingReducer from './userTracking';
import citiesReducer from './cities';

const rootReducer = combineReducers({
  	// short hand property names
  	authReducer,
  	carsReducer,
  	flightsReducer,
  	hotelsReducer,
  	customersReducer,
  	billsReducer,
  	homeReducer,
  	userTrackingReducer,
	  citiesReducer
})

export default rootReducer;
