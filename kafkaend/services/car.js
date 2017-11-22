var mongo = require('./mongo');
var validator = require('validator');
var ObjectID = require('mongodb').ObjectID
var carModel = require('../models/car.js');


function addCar(msg, callback){
	var res = {};
	
	if(validator.isNumeric( msg.carQuantity) && validator.isNumeric( msg.dailyRentalValue) && validator.isNumeric( msg.occupancy) )
	{
		
		msg.createdDate = new Date();
		msg.updatedDate = new Date() ; 
		msg.carQuantity = parseInt(msg.carQuantity) ; 
		msg.dailyRentalValue = parseInt(msg.dailyRentalValue) ; 
		msg.occupancy = parseInt(msg.occupancy) ;
		msg.is_deleted = false ; 

		var serviceDays = (new Date(msg.serviceEndDate)- new Date(msg.serviceStartDate))/(1000*60*60*24) ; 

		var availabilityDateObject = [] ; 
		for(var i=0 ; i <= serviceDays ; i++){
			var date = new Date(msg.serviceStartDate) ;
			date.setDate(date.getDate() + i);
			availabilityDateObject.push({availabilityDate : date , availableCars : msg.carQuantity})
		}

		
		msg.availability = availabilityDateObject ;
		delete msg.serviceEndDate;
		delete msg.serviceStartDate;
		
		msg.deletedDate = new Date();


		var newCar = new carModel(msg);
		
		newCar.save(function (err) {
			if(err) {
				console.log(err);
				res.code = 500 ; 
				res.status  = 500 ; 
				res.message = "Error occured while registering a car with server"
				callback(null , res); 
			} else {
				res.code = 200  ; 
				res.status  = 200 ; 
				res.message = "Success"
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

function getCars(msg, callback){
	var res = {};

	carModel.find({ is_deleted : false}, function(err, result){
		if(err){
			res.code = 500  ; 
			res.status  = 500 ; 
			res.message = "Fail to get all hotels from the server"
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

function getCarById(msg, callback){
	var res = {};
	console.log(msg);
	idToGet = new ObjectID(msg.id) ;

	

	carModel.find({ is_deleted : false , _id : idToGet }).lean().exec(function(err, result){
		if(err){
			res.code = 500  ; 
			res.status  = 500 ; 
			res.message = "Fail to get all cars from the server"
			callback(null , res) ; 
		}else{

			var startDate =  result[0].availability[0].availabilityDate ;
			startDate.setDate(startDate.getDate() + 1);
			var endDate =  result[0].availability[result[0].availability.length-1].availabilityDate;
			endDate.setDate(endDate.getDate() + 1);

			var mmS = startDate.getMonth().toString().length > 1 ? startDate.getMonth()+1 : '0' + startDate.getMonth().toString()+1;
			var ddS  = startDate.getDate().toString().length > 1 ? startDate.getDate() : '0' + startDate.getDate().toString() ; 

			var mmE = endDate.getMonth().toString().length > 1 ? endDate.getMonth()+1 : '0' + endDate.getMonth().toString()+1;
			var ddE  = endDate.getDate().toString().length > 1 ? endDate.getDate() : '0' + endDate.getDate().toString() ; 

			startDate = startDate.getFullYear() +  "-" + mmS + "-" + ddS 
			endDate = endDate.getFullYear() +  "-" + mmE + "-" + ddE 

			delete result[0].availability;
			result[0].serviceStartDate = startDate ;
			result[0].serviceEndDate = endDate ; 

			console.log("Result check ", result[0]) ; 

			res.code = 200  ; 
			res.status  = 200 ; 
			res.message = "Success"
			res.data = result
			callback(null , res) ; 
		}
	})	




	
}



function updateCarById(msg, callback){
	var res = {};
	idToUpdate = new ObjectID(msg._id) ;
	msg._id = idToUpdate ; 
	msg.updatedDate = new Date() ; 
	
	var serviceDays = (new Date(msg.serviceEndDate)- new Date(msg.serviceStartDate))/(1000*60*60*24) ; 

	var availabilityDateObject = [] ; 
	for(var i=0 ; i <= serviceDays ; i++){
		var date = new Date(msg.serviceStartDate) ;
		date.setDate(date.getDate() + i);
		availabilityDateObject.push({availabilityDate : date , availableCars : msg.carQuantity})
	}


	msg.availability = availabilityDateObject ;
	delete msg.serviceEndDate;
	delete msg.serviceStartDate;


	


	carModel.update({is_deleted : false , _id : idToUpdate }, msg, { multi: false }, function(err , response){
			if(err){
				console.log(err);
				res.code = 500 ; 
				res.status  = 500 ; 
				res.message = "Error occured while updating  a car"
				callback(null , res); 
			}else{
				res.code = 200  ; 
				res.status  = 200 ; 
				res.message = "Success"
				callback(null , res) ; 	
			}
		})
	
}

function deleteCarById(msg, callback){
	var res = {};
	
	var idToDelete = new ObjectID(msg.idToDelete) ;
	if(!validator.isEmpty(msg.idToDelete)){
		carModel.update({is_deleted : false , _id : idToDelete }, { $set: {is_deleted: true }}, { multi: false }, function(err , response){
			if(err){
				console.log(err);
				res.code = 500 ; 
				res.status  = 500 ; 
				res.message = "Error occured while deleting a hotel"
				callback(null , res); 
			}else{
				res.code = 200  ; 
				res.status  = 200 ; 
				res.message = "Success"
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

function getCarsForCustomer(msg, callback){
	var res = {};
	res.code = 200;
	res.message = "Success";
	callback(null, res);
}

exports.addCar = addCar;
exports.getCars = getCars;
exports.getCarById = getCarById;
exports.updateCarById = updateCarById;
exports.deleteCarById = deleteCarById;
exports.getCarsForCustomer = getCarsForCustomer;