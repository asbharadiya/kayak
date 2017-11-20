var mongo = require('./mongo');
var validator = require('validator');
var ObjectID = require('mongodb').ObjectID;
var flightModel = require('../models/flight.js');

function addFlight(msg, callback){
	var res = {};
	if(!validator.isEmpty(msg.airline)){
		msg.is_deleted = false;		
		var newFlight = new flightModel(msg);
		newFlight.save(function (err) {
			if(err) {
				console.log(err);
				res.code = 500 ; 
				res.status  = 500 ; 
				res.message = "Error occured while registering a flight with server"
				callback(null , res); 
			} else {
				res.code = 200  ; 
				res.status  = 200 ; 
				res.message = "Success";
				callback(null , res) ; 
			}
		});
	}else{
		res.code = 400;
		res.status  = 400 ; 
		res.data = []
		res.message = "Please pass the correct Parameteres";
		callback(null, res);
   }
}

function getFlights(msg, callback){
    var res = {};
    flightModel.find({ is_deleted : false}, function(err, result){
    	if(err){
			res.code = 500  ; 
			res.status  = 500 ; 
			res.message = "Fail to get all flights from the server"
			callback(null , res) ; 
		}else{
			res.code = 200  ; 
			res.status  = 200 ; 
			res.message = "Success"
			res.data = result
			callback(null , res) ; 
		}
    });
}

function getFlightById(msg, callback){
    var res = {};
    var idToGet = new ObjectID(msg.id) ;
    if(!validator.isEmpty(msg.id)){
    	flightModel.findOne({ is_deleted : false , _id : idToGet }, function(err, result){
        	if(err){
				res.code = 500 ; 
				res.status  = 500; 
				res.message = "Fail to get flight from the server";
				callback(null , res); 
			}else{
				res.code = 200 ; 
				res.status  = 200; 
				res.message = "Success";
				res.data = result;
				callback(null , res);
			}
        });
	}else{
		res.code = 400;
		res.status  = 400 ; 
		res.data = []
		res.message = "Please pass the correct Parameteres";
		callback(null, res);
   }
}

function updateFlightById(msg, callback){
    var res = {};
    var idToUpdate = new ObjectID(msg.idToUpdate) ;
    msg.is_deleted = false;
    if(!validator.isEmpty(msg.idToUpdate)){
    	flightModel.update({is_deleted : false , _id : idToUpdate }, msg, { multi: false }, function(err , response){
    		if(err){
	    		console.log(err);
				res.code = 500 ; 
				res.status  = 500 ; 
				res.message = "Error occured while updating a flight"
				callback(null , res); 
			} else {
				res.code = 200  ; 
				res.status  = 200 ; 
				res.message = "Hotel successfully updated";
				callback(null , res) ; 
			}
		})
	}else{
		res.code = 400;
		res.status  = 400 ; 
		res.data = []
		res.message = "Please pass the correct Parameteres";
		callback(null, res);
	}
}

function deleteFlightById(msg, callback){
    var res = {};
    var idToDelete = new ObjectID(msg.idToDelete) ;
    if(!validator.isEmpty(msg.idToDelete)){
    	flightModel.update({is_deleted : false , _id : idToDelete }, { $set: {is_deleted: true }}, { multi: false }, function(err , response){
    		if(err){
				console.log(err);
				res.code = 500 ; 
				res.status  = 500 ; 
				res.message = "Error occured while deleting a flight"
				callback(null , res); 
			}else{
				res.code = 200  ; 
				res.status  = 200 ; 
				res.message = "Hotel successfully deleted";
				callback(null , res) ; 
			}
		})
	}else{
		res.code = 400;
		res.status  = 400 ; 
		res.data = []
		res.message = "Please pass the correct Parameteres";
		callback(null, res);
	}
}

function getFlightsForCustomer(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

exports.addFlight = addFlight;
exports.getFlights = getFlights;
exports.getFlightById = getFlightById;
exports.updateFlightById = updateFlightById;
exports.deleteFlightById = deleteFlightById;
exports.getFlightsForCustomer = getFlightsForCustomer;